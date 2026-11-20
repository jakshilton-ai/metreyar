import os
import tempfile
import time
from pathlib import Path
from collections import defaultdict, deque

import ezdxf
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from ezdxf.addons.drawing import RenderContext, Frontend
from ezdxf.addons.drawing.matplotlib import MatplotlibBackend
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask

APP_VERSION = "0.1.0"
MAX_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", str(20 * 1024 * 1024)))
ALLOWED_ORIGINS = [x.strip() for x in os.getenv(
    "ALLOWED_ORIGINS", "https://jakshilton-ai.github.io"
).split(",") if x.strip()]
RATE_LIMIT = int(os.getenv("RATE_LIMIT_PER_MINUTE", "5"))
WINDOW = 60
requests_by_ip = defaultdict(deque)

app = FastAPI(title="Metreyar Engineering File Converter", version=APP_VERSION)

@app.get("/")
def root():
    return {
        "ok": True,
        "service": "metreyar-converter",
        "version": APP_VERSION,
        "health": "/health",
        "docs": "/docs",
        "convert": "POST /convert",
        "cloudconvert_status": "GET /cloudconvert/status/{job_id}",
    }
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

def cleanup(path: str):
    try:
        Path(path).unlink(missing_ok=True)
    except Exception:
        pass


# Cached public financial quotes. The primary fallback is a public JSON feed
# that needs no API key; provider calls are server-side so the mobile browser never
# needs a VPN or exposes credentials.
_finance_cache = {"at": 0.0, "data": None}

@app.get("/market/financial")
async def financial_market():
    now = time.time()
    if _finance_cache["data"] is not None and now - _finance_cache["at"] < 180:
        return _finance_cache["data"]

    import httpx
    result = {
        "ok": True,
        "provider": "Iran Market Data",
        "prices": {},
        "updated_at": None,
        "sources": {},
        "fallback": True,
    }
    timeout = httpx.Timeout(12.0, connect=6.0)
    async with httpx.AsyncClient(timeout=timeout, follow_redirects=True) as client:
        # Public no-key JSON: gold 18K and free-market USD, refreshed by its publisher
        # approximately every 30 minutes. Prices are already in toman (IRT).
        try:
            response = await client.get(
                "https://raw.githubusercontent.com/iran-market/iran-market.github.io/main/data/popular.json",
                headers={"Accept": "application/json", "User-Agent": "Metreyar/1.0"},
            )
            response.raise_for_status()
            payload = response.json()
            rows = payload.get("data", [])
            by_symbol = {row.get("symbol"): row for row in rows if isinstance(row, dict)}
            for symbol, key in (("USD_IRR_FREE", "usd"), ("GOLD_18K_IRR", "gram18")):
                row = by_symbol.get(symbol)
                if row and row.get("price") is not None and float(row["price"]) > 0:
                    result["prices"][key] = {
                        "price": row["price"],
                        "change_pct": row.get("change_pct"),
                        "updated_at": row.get("timestamp_tehran") or row.get("checked_at"),
                    }
                    result["sources"][key] = row.get("source") or "Iran Market Data"
            result["updated_at"] = (
                payload.get("meta", {}).get("updated_at")
                or payload.get("meta", {}).get("published_at")
            )
            result["stale"] = bool(payload.get("meta", {}).get("stale")) or any(
                bool(row.get("stale")) for row in by_symbol.values()
                if row.get("symbol") in ("USD_IRR_FREE", "GOLD_18K_IRR")
            )
        except (httpx.HTTPError, ValueError, TypeError, AttributeError):
            pass

        # Higher-frequency provider is optional. It is used only when an API key
        # is configured; no-key requests stay on the public feed and avoid test quotas.
        api_key = os.getenv("TALASANJ_API_KEY", "").strip()
        if api_key:
            try:
                response = await client.get(
                    "https://talasanj.info/api/v1/prices?unit=toman",
                    headers={
                        "Authorization": f"Bearer {api_key}",
                        "X-Client-Name": "Metreyar",
                        "X-Client-Url": "https://myket.ir/app/co.median.android.bnpraqo",
                    },
                )
                response.raise_for_status()
                payload = response.json()
                live_prices = payload.get("prices", {})
                for key in ("usd", "gram18", "gram24", "mazaneh", "ounce"):
                    if live_prices.get(key) and live_prices[key].get("price") is not None:
                        result["prices"][key] = live_prices[key]
                        result["sources"][key] = "Talasanj"
                result["updated_at"] = payload.get("updated_at") or result["updated_at"]
                result["provider"] = "Talasanj + Iran Market Data"
                result["fallback"] = False
            except (httpx.HTTPError, ValueError, TypeError, AttributeError):
                # Keep valid public-feed data if the optional provider is unavailable.
                pass

        # TSETMC may restrict requests by server IP. Treat this as optional and
        # never fail the gold/USD response if the stock endpoint is unreachable.
        try:
            tse = await client.get(
                "https://cdn.tsetmc.com/api/MarketData/GetMarketOverview/0",
                headers={
                    "User-Agent": "Mozilla/5.0 (compatible; Metreyar/1.0)",
                    "Referer": "https://www.tsetmc.com/",
                },
            )
            tse.raise_for_status()
            overview = tse.json().get("marketOverview", {})
            if isinstance(overview, list):
                overview = overview[0] if overview else {}
            if isinstance(overview, dict) and overview.get("indexLastValue") is not None:
                result["tedpix"] = {
                    "value": overview.get("indexLastValue"),
                    "change_pct": overview.get("indexChange"),
                    "updated_at": overview.get("dEven"),
                }
                result["sources"]["tedpix"] = "TSETMC"
        except (httpx.HTTPError, ValueError, AttributeError, TypeError):
            result["tedpix_unavailable"] = True

    if result["prices"]:
        _finance_cache["at"] = now
        _finance_cache["data"] = result
        return result

    if _finance_cache["data"] is not None:
        stale = dict(_finance_cache["data"])
        stale["stale"] = True
        stale["warning"] = "منبع قیمت فعلاً پاسخ نمی‌دهد؛ آخرین داده ذخیره‌شده نمایش داده می‌شود."
        return stale

    raise HTTPException(502, "داده قیمت بازار از منابع اصلی و جایگزین دریافت نشد.")

@app.get("/health")
def health():
    return {"ok": True, "service": "metreyar-converter", "version": APP_VERSION}

@app.get("/aps/status")
def aps_status():
    configured = all(os.getenv(k) for k in ("APS_CLIENT_ID", "APS_CLIENT_SECRET", "APS_ACTIVITY_ID"))
    return {
        "provider": "Autodesk Platform Services",
        "configured": configured,
        "dwg_conversion": "ready_for_activity_setup" if configured else "credentials_and_activity_required"
    }


async def cloudconvert_start(file: UploadFile, name: str, ext: str):
    api_key = os.getenv("CLOUDCONVERT_API_KEY")
    if not api_key:
        raise HTTPException(
            503,
            "تبدیل ابری فعال نیست؛ مدیر سامانه باید CLOUDCONVERT_API_KEY را در تنظیمات محرمانه Render ثبت کند."
        )
    import httpx
    raw = await file.read(MAX_BYTES + 1)
    if not raw:
        raise HTTPException(400, "فایل خالی است.")
    if len(raw) > MAX_BYTES:
        raise HTTPException(413, f"حجم فایل از حد مجاز {MAX_BYTES // (1024 * 1024)} مگابایت بیشتر است.")

    headers = {"Authorization": f"Bearer {api_key}"}
    tasks = {
        "upload-source": {"operation": "import/upload"},
        "convert-to-pdf": {
            "operation": "convert",
            "input": "upload-source",
            "input_format": ext.lstrip("."),
            "output_format": "pdf"
        },
        "export-pdf": {"operation": "export/url", "input": "convert-to-pdf"}
    }
    timeout = httpx.Timeout(45.0, connect=15.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            created = await client.post(
                "https://api.cloudconvert.com/v2/jobs",
                headers={**headers, "Content-Type": "application/json"},
                json={"tag": f"metreyar-{int(time.time())}", "tasks": tasks}
            )
            created.raise_for_status()
            job = created.json().get("data", {})
            upload_task = next((t for t in job.get("tasks", []) if t.get("name") == "upload-source"), None)
            upload_form = (upload_task or {}).get("result", {}).get("form", {})
            if not upload_form.get("url") or not isinstance(upload_form.get("parameters"), dict):
                raise HTTPException(502, "اطلاعات بارگذاری امن از CloudConvert دریافت نشد.")
            upload_response = await client.post(
                upload_form["url"],
                data={k: str(v) for k, v in upload_form["parameters"].items()},
                files={"file": (name, raw, file.content_type or "application/octet-stream")},
                timeout=httpx.Timeout(90.0, connect=15.0)
            )
            upload_response.raise_for_status()
            return {"ok": True, "jobId": job.get("id"), "status": "processing", "provider": "CloudConvert"}
        except HTTPException:
            raise
        except httpx.HTTPStatusError as exc:
            detail = "درخواست CloudConvert ناموفق بود."
            try:
                detail = exc.response.json().get("message") or detail
            except Exception:
                pass
            raise HTTPException(502, detail) from exc
        except httpx.HTTPError as exc:
            raise HTTPException(502, "ارتباط با CloudConvert برقرار نشد؛ دوباره تلاش کنید.") from exc


@app.get("/cloudconvert/status/{job_id}")
async def cloudconvert_status(job_id: str):
    api_key = os.getenv("CLOUDCONVERT_API_KEY")
    if not api_key:
        raise HTTPException(503, "اتصال CloudConvert روی سرور تنظیم نشده است.")
    if not job_id or len(job_id) > 100 or not all(c.isalnum() or c == "-" for c in job_id):
        raise HTTPException(400, "شناسه درخواست تبدیل معتبر نیست.")
    import httpx
    async with httpx.AsyncClient(timeout=httpx.Timeout(20.0, connect=10.0)) as client:
        try:
            response = await client.get(
                f"https://api.cloudconvert.com/v2/jobs/{job_id}",
                headers={"Authorization": f"Bearer {api_key}"},
            )
            response.raise_for_status()
            job = response.json().get("data", {})
        except httpx.HTTPStatusError as exc:
            raise HTTPException(502, "بررسی وضعیت تبدیل در CloudConvert ناموفق بود.") from exc
        except httpx.HTTPError as exc:
            raise HTTPException(502, "ارتباط با CloudConvert برقرار نشد.") from exc

    if not str(job.get("tag", "")).startswith("metreyar-"):
        raise HTTPException(404, "درخواست تبدیل متعلق به متره‌یار نیست.")
    export_task = next((t for t in job.get("tasks", []) if t.get("name") == "export-pdf"), None)
    output = ((export_task or {}).get("result") or {}).get("files") or []
    first = output[0] if output else {}
    failed = next((t for t in job.get("tasks", []) if t.get("status") == "error"), None)
    return {
        "ok": True,
        "jobId": job.get("id"),
        "status": job.get("status", "processing"),
        "downloadUrl": first.get("url"),
        "filename": first.get("filename"),
        "error": (failed or {}).get("message") if job.get("status") == "error" else None,
    }

@app.post("/convert")
async def convert(request: Request, file: UploadFile = File(...)):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    q = requests_by_ip[ip]
    while q and now - q[0] > WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        raise HTTPException(429, "تعداد درخواست‌ها زیاد است؛ یک دقیقه بعد دوباره تلاش کنید.")
    q.append(now)

    name = Path(file.filename or "upload").name
    ext = Path(name).suffix.lower()
    if ext not in {".dxf", ".dwg", ".pdf"}:
        raise HTTPException(
            415,
            "این نسخه فقط PDF و DXF را پردازش می‌کند. برای SAFE و STAAD.Pro ابتدا از نرم‌افزار اصلی گزارش PDF بگیرید."
        )
    if ext in {".dwg", ".dxf"} and os.getenv("CLOUDCONVERT_API_KEY"):
        return await cloudconvert_start(file, name, ext)
    if ext == ".dwg":
        raise HTTPException(
            503,
            "تبدیل DWG فعال نیست؛ مدیر سامانه باید CLOUDCONVERT_API_KEY را در تنظیمات محرمانه سرور ثبت کند."
        )

    tmp_in = None
    tmp_out = None
    handed_off = False
    try:
        suffix = ext
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as source:
            tmp_in = source.name
            total = 0
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                total += len(chunk)
                if total > MAX_BYTES:
                    raise HTTPException(413, "حجم فایل از حد مجاز ۲۰ مگابایت بیشتر است.")
                source.write(chunk)

        if total == 0:
            raise HTTPException(400, "فایل خالی است.")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as target:
            tmp_out = target.name

        if ext == ".pdf":
            Path(tmp_out).write_bytes(Path(tmp_in).read_bytes())
        else:
            try:
                doc = ezdxf.readfile(tmp_in)
                msp = doc.modelspace()
                fig = plt.figure()
                ax = fig.add_axes([0.02, 0.02, 0.96, 0.96])
                backend = MatplotlibBackend(ax)
                Frontend(RenderContext(doc), backend).draw_layout(msp, finalize=True)
                fig.savefig(tmp_out, format="pdf", bbox_inches="tight")
                plt.close(fig)
            except Exception as exc:
                raise HTTPException(422, "خواندن یا ترسیم این DXF ممکن نشد؛ فایل را در AutoCAD بررسی و دوباره ذخیره کنید.") from exc

        output_name = f"{Path(name).stem}.pdf"
        response = FileResponse(
            tmp_out,
            media_type="application/pdf",
            filename=output_name,
            background=BackgroundTask(cleanup, tmp_out),
        )
        if tmp_in:
            cleanup(tmp_in)
            tmp_in = None
        # Keep the generated PDF until Starlette has finished streaming it.
        # FileResponse's background task removes it after the response is sent.
        handed_off = True
        return response
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(500, "خطا در تبدیل فایل؛ دوباره تلاش کنید.") from exc
    finally:
        await file.close()
        if tmp_in:
            cleanup(tmp_in)
