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

@app.get("/health")
def health():
    return {"ok": True, "service": "metreyar-converter", "version": APP_VERSION}

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
    if ext == ".dwg":
        raise HTTPException(
            415,
            "تبدیل مستقیم DWG به موتور CAD دارای مجوز (Autodesk یا ODA) نیاز دارد. فعلاً فایل را از AutoCAD به DXF یا PDF خروجی بگیرید."
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
        if tmp_out and not handed_off:
            cleanup(tmp_out)
            tmp_in = None
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
