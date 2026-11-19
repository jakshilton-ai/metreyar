# Autodesk APS — فعال‌سازی تبدیل مستقیم DWG

متره‌یار از نظر معماری، آماده اتصال به Autodesk Platform Services (APS) است؛ اما صرف داشتن Client ID/Secret کافی نیست. برای تبدیل DWG به PDF باید یک AutoCAD Design Automation Activity در حساب APS ایجاد و آزمایش شود.

## منابع رسمی
- APS Design Automation for AutoCAD: https://aps.autodesk.com/en/docs/design-automation/v3/
- راهنمای رسمی اجرای WorkItem: https://get-started.aps.autodesk.com/tutorials/design-automation/
- نمونه رسمی Autodesk برای گردش‌کار DWG به PDF: https://github.com/autodesk-platform-services/aps-da4acad-dgn2dwg2pdf

## تنظیمات محرمانه Render
در Dashboard سرویس metreyar-converter → Environment، این متغیرها باید پس از ساخت و آزمایش Activity تنظیم شوند:
- APS_CLIENT_ID
- APS_CLIENT_SECRET
- APS_ACTIVITY_ID

هرگز Client Secret را در GitHub، کد مرورگر یا گفتگو قرار ندهید.

## وضعیت فعلی
- `GET /aps/status` گزارش می‌دهد که اعتبارنامه و Activity تنظیم شده‌اند یا نه.
- انتخاب فایل DWG در رابط کاربری فعال شده است.
- endpoint فعلی هنوز DWG را به APS ارسال نمی‌کند؛ تا زمان پیاده‌سازی و آزمایش چرخه OAuth → Object Storage → WorkItem → دریافت PDF، پاسخ 503 برمی‌گرداند.
- برای حفظ دقت نقشه، Activity باید تنظیمات Plot، Layout، کاغذ، CTB/STB و وابستگی‌ها/Xref را صریحاً مدیریت کند. تبدیل ساده بدون این تنظیمات ممکن است خروجی قابل اتکا برای نقشه مهندسی ندهد.

## هزینه و محدودیت
APS پلن آزمایشی رایگان با محدودیت‌های ماهانه دارد و برای استفاده عملیاتی ممکن است به پلن پولی نیاز باشد. پیش از فعال‌سازی مصرف پولی، سقف هزینه و حجم کار باید در حساب Autodesk بررسی شود.
