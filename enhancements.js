(()=>{'use strict';
const $=s=>document.querySelector(s);
const languageNames={fa:'فارسی',en:'English',de:'Deutsch',ar:'العربية'};
const dict={
en:{
'خانه':'Home','دیوارچینی':'Masonry','بتن‌ریزی':'Concrete','میلگرد':'Rebar','خاموت':'Stirrups','کاشی و سرامیک':'Tiles & ceramics','موزاییک کف':'Floor tiles','سرامیک کف':'Floor ceramic','فوم بتن':'Foam concrete','خیز مثبت و منفی دال':'Slab camber / deflection','خاک‌برداری':'Excavation','سیمانکاری':'Cement plaster','رنگ‌آمیزی':'Painting','قوطی و پروفیل':'Hollow sections & profiles','برآورد سیم‌کشی':'Electrical wiring estimate','بار و جریان برق':'Electrical load & current','مرجع مصالح':'Material reference','راهنما':'Guide','درباره':'About','محاسبه':'Calculate','کپی نتیجه':'Copy result','یکی از ابزارها را انتخاب کنید':'Choose a tool','طول':'Length','عرض':'Width','ضخامت':'Thickness','طول دیوار':'Wall length','ارتفاع دیوار':'Wall height','مساحت بازشوها':'Opening area','تعداد در هر متر مربع':'Units per square metre','درصد ضایعات':'Waste (%)','سیمان در هر متر مکعب':'Cement per cubic metre','کیسه سیمان (۵۰ کیلویی)':'50 kg cement bags','تعداد شاخه':'Number of bars','طول هر شاخه':'Bar length','قطر میلگرد':'Rebar diameter','مساحت سطح':'Surface area','طول کاشی':'Tile length','عرض کاشی':'Tile width','درصد پرت و شکستگی':'Breakage / waste (%)','مساحت کف':'Floor area','تعداد در هر بسته':'Units per pack','ضخامت بستر ملات':'Mortar bed thickness','سیمان مصرفی ملات در هر متر مکعب':'Cement per m³ of mortar','ماسه مصرفی در هر متر مکعب ملات':'Sand per m³ of mortar','ضخامت فوم بتن':'Foam concrete thickness','چگالی هدف':'Target density','مایع کف‌زا':'Foaming agent','دهانه دال':'Slab span','مخرج نسبت خیز مثبت (L/n)':'Positive camber ratio denominator (L/n)','مخرج نسبت خیز منفی (L/n)':'Negative deflection ratio denominator (L/n)','طول المان (تیر/ستون)':'Member length (beam/column)','فاصله خاموت‌ها':'Stirrup spacing','عرض مقطع':'Section width','ارتفاع مقطع':'Section depth','پوشش بتن':'Concrete cover','ضریب تورم خاک':'Soil swell factor','ظرفیت کامیون':'Truck capacity','تعداد دست':'Number of coats','پوشش هر لیتر در هر دست':'Coverage per litre per coat','بعد اول':'First dimension','بعد دوم':'Second dimension','ضخامت جداره':'Wall thickness','مساحت واحد / طبقه':'Floor area','تعداد نقاط روشنایی':'Lighting points','تعداد پریزها':'Socket outlets','میانگین مسیر هر نقطه روشنایی':'Average lighting cable run','میانگین مسیر هر پریز':'Average socket cable run','تعداد رشته سیم در هر مسیر':'Conductors per run','توان کل تجهیزات متصل':'Total connected load','ولتاژ نامی':'Rated voltage','ضریب توان (cos φ)':'Power factor (cos φ)','ضریب هم‌زمانی':'Demand factor','متر':'m','متر مربع':'m²','متر مکعب':'m³','سانتی‌متر':'cm','میلی‌متر':'mm','کیلوگرم':'kg','کیلوگرم بر متر مکعب':'kg/m³','عدد':'pcs','کیسه':'bags','بسته':'packs','لیتر':'L','آمپر':'A','وات':'W','ولت':'V','نقطه':'points','رشته':'conductors','سفر':'trips','قیمت هر عدد (تومان)':'Price per unit (Toman)','قیمت هر متر مکعب بتن (تومان)':'Concrete price per m³ (Toman)','قیمت هر کیلوگرم (تومان)':'Price per kg (Toman)','قیمت هر متر مربع (تومان)':'Price per m² (Toman)','قیمت هر کارتن سرامیک (تومان)':'Price per carton (Toman)','قیمت هر متر مکعب (تومان)':'Price per m³ (Toman)','قیمت هر لیتر (تومان)':'Price per litre (Toman)','قیمت اجرای هر متر مربع (تومان)':'Installation price per m² (Toman)','کپی لینک مایکت':'Copy Myket link','♫ موسیقی آرام: خاموش':'♫ Calm music: Off','♫ موسیقی آرام: روشن':'♫ Calm music: On','برگشت به گزینه‌ها':'Back to tools','تقویم شمسی / میلادی':'Persian / Gregorian calendar','ماشین‌حساب':'Calculator','آیین‌نامه نظام مهندسی':'Building regulations','بستن':'Close','نتیجه':'Result','عبارت نامعتبر است':'Invalid expression','تاریخ شمسی معتبر وارد کنید':'Enter a valid Persian date','تاریخ را در یکی از تقویم‌ها وارد کنید تا معادل آن نمایش داده شود.':'Enter a date in either calendar to convert it.','میلادی:':'Gregorian:','شمسی:':'Persian:','جست‌وجوی مبحث...':'Search regulations...','فهرست مباحث مقررات ملی ساختمان':'National Building Regulations','ماشین‌حساب مهندسی':'Engineering calculator','تقویم شمسی و میلادی':'Persian and Gregorian calendar','میلادی':'Gregorian','شمسی':'Persian','مبحث ':'Topic ','تعاریف':'Definitions','نظامات اداری':'Administrative regulations','حفاظت ساختمان‌ها در مقابل حریق':'Fire protection of buildings','الزامات عمومی ساختمان‌ها':'General building requirements','مصالح و فرآورده‌های ساختمانی':'Building materials and products','بارهای وارد بر ساختمان':'Loads on buildings','ژئوتکنیک و مهندسی پی':'Geotechnics and foundation engineering','طرح و اجرای ساختمان‌های با مصالح بنایی':'Design and construction of masonry buildings','طرح و اجرای ساختمان‌های بتن‌آرمه':'Design and construction of reinforced concrete buildings','طرح و اجرای ساختمان‌های فولادی':'Design and construction of steel buildings','طرح و اجرای صنعتی ساختمان‌ها':'Industrialized building construction','ایمنی و حفاظت کار در حین اجرا':'Construction safety and protection','طرح و اجرای تأسیسات برقی ساختمان‌ها':'Design and installation of electrical systems','تأسیسات مکانیکی':'Mechanical installations','آسانسورها و پلکان برقی':'Lifts and escalators','تأسیسات بهداشتی':'Sanitary installations','سامانه گاز طبیعی در ساختمان':'Natural gas systems in buildings','عایق‌بندی و تنظیم صدا':'Sound insulation and control','صرفه‌جویی در مصرف انرژی':'Energy efficiency','علائم و تابلوها':'Signs and signals','پدافند غیرعامل':'Passive defense','مراقبت و نگهداری ساختمان‌ها':'Building maintenance','الزامات ترافیکی ساختمان‌ها':'Building traffic requirements','انطباق شهری ساختمان':'Urban conformity of buildings','برای مشاهده جزئیات، آخرین نسخه و اصلاحیه‌های رسمی را بررسی کنید.':'Check the latest official edition and amendments for details.','مشاهده مرجع رسمی مقررات ملی ساختمان':'Open official National Building Regulations portal'
},
de:{
'خانه':'Startseite','دیوارچینی':'Mauerwerk','بتن‌ریزی':'Betonieren','میلگرد':'Bewehrungsstahl','خاموت':'Bügel','کاشی و سرامیک':'Fliesen & Keramik','موزاییک کف':'Bodenfliesen','سرامیک کف':'Bodenkeramik','فوم بتن':'Schaumbeton','خیز مثبت و منفی دال':'Deckendurchbiegung','خاک‌برداری':'Aushub','سیمانکاری':'Zementputz','رنگ‌آمیزی':'Anstrich','قوطی و پروفیل':'Hohlprofile','برآورد سیم‌کشی':'Elektroinstallation – Schätzung','بار و جریان برق':'Elektrische Last & Strom','مرجع مصالح':'Materialreferenz','راهنما':'Anleitung','درباره':'Über die App','محاسبه':'Berechnen','کپی نتیجه':'Ergebnis kopieren','یکی از ابزارها را انتخاب کنید':'Werkzeug auswählen','طول':'Länge','عرض':'Breite','ضخامت':'Dicke','طول دیوار':'Wandlänge','ارتفاع دیوار':'Wandhöhe','مساحت بازشوها':'Öffnungsfläche','تعداد در هر متر مربع':'Stück pro Quadratmeter','درصد ضایعات':'Verschnitt (%)','سیمان در هر متر مکعب':'Zement je Kubikmeter','کیسه سیمان (۵۰ کیلویی)':'Zementsäcke (50 kg)','تعداد شاخه':'Anzahl Stäbe','طول هر شاخه':'Stablänge','قطر میلگرد':'Bewehrungsdurchmesser','مساحت سطح':'Fläche','طول کاشی':'Fliesenlänge','عرض کاشی':'Fliesenbreite','مساحت کف':'Bodenfläche','تعداد دست':'Anzahl Anstriche','پوشش هر لیتر در هر دست':'Reichweite je Liter und Anstrich','بعد اول':'Erstes Maß','بعد دوم':'Zweites Maß','ضخامت جداره':'Wandstärke','ضریب تورم خاک':'Auflockerungsfaktor','ظرفیت کامیون':'LKW-Kapazität','تعداد نقاط روشنایی':'Lichtpunkte','تعداد پریزها':'Steckdosen','توان کل تجهیزات متصل':'Gesamtanschlussleistung','ولتاژ نامی':'Nennspannung','ضریب توان (cos φ)':'Leistungsfaktor (cos φ)','ضریب هم‌زمانی':'Gleichzeitigkeitsfaktor','متر':'m','متر مربع':'m²','متر مکعب':'m³','سانتی‌متر':'cm','میلی‌متر':'mm','کیلوگرم':'kg','عدد':'Stück','کیسه':'Säcke','لیتر':'L','آمپر':'A','وات':'W','ولت':'V','کپی لینک مایکت':'Myket-Link kopieren','♫ موسیقی آرام: خاموش':'♫ Ruhige Musik: Aus','♫ موسیقی آرام: روشن':'♫ Ruhige Musik: Ein','برگشت به گزینه‌ها':'Zurück zur Werkzeugauswahl','تقویم شمسی / میلادی':'Persischer / Gregorianischer Kalender','ماشین‌حساب':'Taschenrechner','آیین‌نامه نظام مهندسی':'Bauvorschriften','بستن':'Schließen','نتیجه':'Ergebnis','عبارت نامعتبر است':'Ungültiger Ausdruck','تاریخ شمسی معتبر وارد کنید':'Gültiges persisches Datum eingeben','جست‌وجوی مبحث...':'Vorschrift suchen...','فهرست مباحث مقررات ملی ساختمان':'Nationale Bauvorschriften','مشاهده مرجع رسمی مقررات ملی ساختمان':'Offizielle Bauvorschriften öffnen'
},
ar:{
'خانه':'الرئيسية','دیوارچینی':'بناء الجدران','بتن‌ریزی':'صب الخرسانة','میلگرد':'حديد التسليح','خاموت':'الكانات','کاشی و سرامیک':'البلاط والسيراميك','موزاییک کف':'بلاط الأرضيات','سرامیک کف':'سيراميك الأرضيات','فوم بتن':'الخرسانة الرغوية','خیز مثبت و منفی دال':'تقوس وهبوط البلاطة','خاک‌برداری':'الحفر','سیمانکاری':'اللياسة الإسمنتية','رنگ‌آمیزی':'الدهان','قوطی و پروفیل':'المقاطع الفولاذية','برآورد سیم‌کشی':'تقدير التمديدات الكهربائية','بار و جریان برق':'الحمل والتيار الكهربائي','مرجع مصالح':'مرجع المواد','راهنما':'الدليل','درباره':'حول التطبيق','محاسبه':'احسب','کپی نتیجه':'نسخ النتيجة','یکی از ابزارها را انتخاب کنید':'اختر أداة','طول':'الطول','عرض':'العرض','ضخامت':'السماكة','طول دیوار':'طول الجدار','ارتفاع دیوار':'ارتفاع الجدار','مساحت بازشوها':'مساحة الفتحات','تعداد در هر متر مربع':'العدد لكل متر مربع','درصد ضایعات':'نسبة الهدر','سیمان در هر متر مکعب':'الإسمنت لكل متر مكعب','کیسه سیمان (۵۰ کیلویی)':'أكياس إسمنت (50 كغ)','تعداد شاخه':'عدد القضبان','طول هر شاخه':'طول القضيب','قطر میلگرد':'قطر حديد التسليح','مساحت سطح':'مساحة السطح','طول کاشی':'طول البلاطة','عرض کاشی':'عرض البلاطة','مساحت کف':'مساحة الأرضية','تعداد دست':'عدد الطبقات','پوشش هر لیتر در هر دست':'تغطية اللتر لكل طبقة','بعد اول':'البعد الأول','بعد دوم':'البعد الثاني','ضخامت جداره':'سماكة الجدار','ضریب تورم خاک':'معامل انتفاخ التربة','ظرفیت کامیون':'سعة الشاحنة','تعداد نقاط روشنایی':'نقاط الإنارة','تعداد پریزها':'المقابس','توان کل تجهیزات متصل':'إجمالي القدرة المتصلة','ولتاژ نامی':'الجهد الاسمي','ضریب توان (cos φ)':'معامل القدرة','ضریب هم‌زمانی':'معامل التزامن','متر':'م','متر مربع':'م²','متر مکعب':'م³','سانتی‌متر':'سم','میلی‌متر':'مم','کیلوگرم':'كغ','عدد':'عدد','کیسه':'أكياس','لیتر':'لتر','آمپر':'أمبير','وات':'واط','ولت':'فولت','کپی لینک مایکت':'نسخ رابط Myket','♫ موسیقی آرام: خاموش':'♫ الموسيقى الهادئة: إيقاف','♫ موسیقی آرام: روشن':'♫ الموسيقى الهادئة: تشغيل','برگشت به گزینه‌ها':'العودة إلى الأدوات','تقویم شمسی / میلادی':'التقويم الفارسي / الميلادي','ماشین‌حساب':'آلة حاسبة','آیین‌نامه نظام مهندسی':'لوائح البناء','بستن':'إغلاق','نتیجه':'النتيجة','عبارت نامعتبر است':'تعبير غير صالح','تاریخ شمسی معتبر وارد کنید':'أدخل تاريخاً فارسياً صحيحاً','جست‌وجوی مبحث...':'ابحث في اللوائح...','فهرست مباحث مقررات ملی ساختمان':'لوائح البناء الوطنية','ماشین‌حساب مهندسی':'آلة حاسبة هندسية','تقویم شمسی و میلادی':'التقويم الفارسي والميلادي','میلادی':'ميلادي','شمسی':'فارسي','مبحث ':'المبحث ','تعاریف':'التعريفات','نظامات اداری':'الأنظمة الإدارية','حفاظت ساختمان‌ها در مقابل حریق':'حماية المباني من الحريق','الزامات عمومی ساختمان‌ها':'المتطلبات العامة للمباني','مصالح و فرآورده‌های ساختمانی':'مواد ومنتجات البناء','بارهای وارد بر ساختمان':'الأحمال على المباني','ژئوتکنیک و مهندسی پی':'الجيوتكنيك وهندسة الأساسات','طرح و اجرای ساختمان‌های با مصالح بنایی':'تصميم وتنفيذ المباني الحجرية','طرح و اجرای ساختمان‌های بتن‌آرمه':'تصميم وتنفيذ الخرسانة المسلحة','طرح و اجرای ساختمان‌های فولادی':'تصميم وتنفيذ المباني الفولاذية','طرح و اجرای صنعتی ساختمان‌ها':'البناء الصناعي','ایمنی و حفاظت کار در حین اجرا':'السلامة والحماية أثناء التنفيذ','طرح و اجرای تأسیسات برقی ساختمان‌ها':'تصميم وتنفيذ الأنظمة الكهربائية','تأسیسات مکانیکی':'الأنظمة الميكانيكية','آسانسورها و پلکان برقی':'المصاعد والسلالم المتحركة','تأسیسات بهداشتی':'التجهيزات الصحية','سامانه گاز طبیعی در ساختمان':'أنظمة الغاز الطبيعي في المباني','عایق‌بندی و تنظیم صدا':'العزل والتحكم بالصوت','صرفه‌جویی در مصرف انرژی':'ترشيد استهلاك الطاقة','علائم و تابلوها':'العلامات واللوحات','پدافند غیرعامل':'الدفاع السلبي','مراقبت و نگهداری ساختمان‌ها':'صيانة المباني','الزامات ترافیکی ساختمان‌ها':'متطلبات المرور للمباني','انطباق شهری ساختمان':'التوافق الحضري للمباني','مشاهده مرجع رسمی مقررات ملی ساختمان':'فتح بوابة اللوائح الرسمية'
}};
const originalText=new WeakMap();
function translate(root=document.body){
 const lang=localStorage.getItem('metreyar.lang')||'fa',d=dict[lang]||{};
 document.documentElement.lang=lang;document.documentElement.dir=(lang==='fa'||lang==='ar')?'rtl':'ltr';
 document.body.style.direction=document.documentElement.dir;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const n=walker.currentNode;if(!originalText.has(n))originalText.set(n,n.nodeValue);
  const original=originalText.get(n),key=original.trim();
  if(d[key])n.nodeValue=original.replace(key,d[key]);
 }
 if(root.querySelectorAll)root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
  ['placeholder','title','aria-label'].forEach(a=>{const v=el.getAttribute(a);if(v&&d[v])el.setAttribute(a,d[v])});
 });
}
function chooseLang(l){localStorage.setItem('metreyar.lang',l);location.reload()}
const style=document.createElement('style');
style.textContent='#mt-extra{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;padding:8px}#mt-extra button,#mt-extra select,.mt-dialog button{font:inherit;font-size:13px;padding:8px 11px;border:1px solid var(--bd);border-radius:10px;background:var(--card);color:var(--tx)}#mt-back{display:none;background:var(--pri)!important;color:var(--prc)!important}.mt-overlay{display:none;position:fixed;z-index:9999;inset:0;background:#071323aa;align-items:center;justify-content:center;padding:12px}.mt-overlay.open{display:flex}.mt-dialog{width:min(620px,100%);max-height:88vh;overflow:auto;background:var(--card);color:var(--tx);border-radius:18px;padding:16px}.mt-dialog header{display:flex;justify-content:space-between;align-items:center;padding:0 0 12px}.mt-dialog h2{font-size:19px}.mt-dialog input{font:inherit;padding:10px;border:1px solid var(--bd);border-radius:9px;background:var(--bg);color:var(--tx);max-width:100%}.mt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:12px 0}.mt-grid button{padding:13px}.mt-result{padding:12px;background:var(--res);border-radius:10px;margin-top:10px;overflow-wrap:anywhere}.mt-dialog details{border-top:1px solid var(--bd);padding:9px 0}.mt-reg-meta{font-size:12px;color:var(--mut)}.mt-reg-link{display:inline-block;margin:8px 0;color:var(--pri);font-weight:700}';
document.head.appendChild(style);
const bar=document.createElement('div');bar.id='mt-extra';
const language=document.createElement('select');language.setAttribute('aria-label','Language');
language.innerHTML='<option value="fa">فارسی</option><option value="en">English</option><option value="de">Deutsch</option><option value="ar">العربية</option>';
language.value=localStorage.getItem('metreyar.lang')||'fa';language.onchange=()=>chooseLang(language.value);
const back=document.createElement('button');back.id='mt-back';back.textContent='↩ برگشت به گزینه‌ها';
const calendarBtn=document.createElement('button');calendarBtn.textContent='📅 تقویم شمسی / میلادی';calendarBtn.onclick=()=>openPanel('calendar');
const calcBtn=document.createElement('button');calcBtn.textContent='🧮 ماشین‌حساب';calcBtn.onclick=()=>openPanel('calc');
const regsBtn=document.createElement('button');regsBtn.textContent='📚 آیین‌نامه نظام مهندسی';regsBtn.onclick=()=>openPanel('regs');
bar.append(language,back,calendarBtn,calcBtn,regsBtn);
const header=document.querySelector('header');if(header)header.insertAdjacentElement('afterend',bar);
const overlay=document.createElement('div');overlay.className='mt-overlay';
overlay.innerHTML='<section class="mt-dialog" role="dialog" aria-modal="true"><header><h2 id="mt-title"></h2><button id="mt-close" type="button" aria-label="برگشت به گزینه‌ها">↩ برگشت به گزینه‌ها</button></header><div id="mt-body"></div></section>';
document.body.appendChild(overlay);
function closePanel(){overlay.classList.remove('open');document.body.style.overflow=''}
document.getElementById('mt-close').onclick=closePanel;
overlay.addEventListener('click',e=>{if(e.target===overlay)closePanel()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))closePanel()});
const localizeDigits=s=>String(s).replace(/[۰-۹٠-٩]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c)>=0?'۰۱۲۳۴۵۶۷۸۹'.indexOf(c):'٠١٢٣٤٥٦٧٨٩'.indexOf(c)));
function calculateExpression(source){
 let s=localizeDigits(source).replace(/٫/g,'.').replace(/,/g,'').replace(/π/g,'pi').replace(/×/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-').replace(/\s+/g,'');
 let tokens=[],i=0;
 while(i<s.length){
  const rest=s.slice(i),num=rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
  const id=rest.match(/^[a-z]+/i);
  if(num){tokens.push({t:'n',v:Number(num[0])});i+=num[0].length}
  else if(id){tokens.push({t:'id',v:id[0].toLowerCase()});i+=id[0].length}
  else if('+-*/^()%'.includes(s[i])){tokens.push({t:s[i]});i++}
  else throw Error('token');
 }
 let p=0;
 function primary(){
  const t=tokens[p++];
  if(!t)throw Error('expression');
  if(t.t==='n')return t.v;
  if(t.t==='+'||t.t==='-'){const v=primary();return t.t==='-'?-v:v}
  if(t.t==='('){const v=expr();if(!tokens[p]||tokens[p++].t!==')')throw Error('paren');return v}
  if(t.t==='id'){
   if(t.v==='pi')return Math.PI;
   if(t.v==='e')return Math.E;
   if(t.v==='sqrt'){if(!tokens[p]||tokens[p++].t!=='(')throw Error('sqrt');const v=expr();if(!tokens[p]||tokens[p++].t!==')'||v<0)throw Error('sqrt');return Math.sqrt(v)}
  }
  throw Error('value');
 }
 function power(){let v=primary();if(tokens[p]&&tokens[p].t==='^'){p++;v=Math.pow(v,power())}if(tokens[p]&&tokens[p].t==='%'){p++;v/=100}return v}
 function term(){let v=power();while(tokens[p]&&(tokens[p].t==='*'||tokens[p].t==='/')){const op=tokens[p++].t,b=power();v=op==='*'?v*b:v/b}return v}
 function expr(){let v=term();while(tokens[p]&&(tokens[p].t==='+'||tokens[p].t==='-')){const op=tokens[p++].t,b=term();v=op==='+'?v+b:v-b}return v}
 const result=expr();if(p!==tokens.length||!Number.isFinite(result))throw Error('invalid');return result;
}
function showCalc(){
 const title=$('#mt-title'),body=$('#mt-body');title.textContent='ماشین‌حساب مهندسی';
 body.innerHTML='<input id="mt-expr" inputmode="decimal" autocomplete="off" placeholder="مثلاً (12.5*4)+8" style="width:100%;direction:ltr;text-align:left"><div class="mt-grid">'+['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','%','+','(',')','^','√','C','⌫','='].map(x=>'<button type="button" data-k="'+x+'">'+x+'</button>').join('')+'</div><div class="mt-result" id="mt-answer">نتیجه</div><small>توابع: √(عدد)، pi، e، توان ^ و درصد %</small>';
 const input=$('#mt-expr'),answer=$('#mt-answer');
 function run(){try{answer.textContent='= '+new Intl.NumberFormat(undefined,{maximumFractionDigits:8}).format(calculateExpression(input.value))}catch(e){answer.textContent='عبارت نامعتبر است'}}
 body.querySelectorAll('[data-k]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.k;if(k==='C'){input.value='';answer.textContent='نتیجه';return}if(k==='⌫'){input.value=input.value.slice(0,-1);return}if(k==='='){run();return}input.value+=k==='√'?'sqrt(':k});
 input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();run()}});
}
function jalaliToGregorian(jy,jm,jd){
 jy=Number(jy);jm=Number(jm);jd=Number(jd);
 if(!Number.isInteger(jy)||!Number.isInteger(jm)||!Number.isInteger(jd)||jy<1200||jy>1600||jm<1||jm>12||jd<1||jd>(jm<=6?31:jm<=11?30:30))throw Error('date');
 let y=jy+1595,z=-355668+365*y+Math.floor(y/33)*8+Math.floor((y%33+3)/4)+jd+(jm<7?(jm-1)*31:(jm-7)*30+186);
 let gy=400*Math.floor(z/146097);z%=146097;
 if(z>36524){gy+=100*Math.floor(--z/36524);z%=36524;if(z>=365)z++}
 gy+=4*Math.floor(z/1461);z%=1461;
 if(z>365){gy+=Math.floor((z-1)/365);z=(z-1)%365}
 let gd=z+1,leap=(gy%4===0&&gy%100!==0)||gy%400===0,days=[0,31,leap?29:28,31,30,31,30,31,31,30,31,30,31],gm=1;
 while(gm<=12&&gd>days[gm]){gd-=days[gm];gm++}
 if(gm>12)throw Error('date');return [gy,gm,gd];
}
function gregorianToJalali(gy,gm,gd){
 const gdm=[0,31,59,90,120,151,181,212,243,273,304,334];let jy=gy<=1600?0:979;gy-=gy<=1600?621:1600;
 const gy2=gm>2?gy+1:gy;let days=365*gy+Math.floor((gy2+3)/4)-Math.floor((gy2+99)/100)+Math.floor((gy2+399)/400)-80+gd+gdm[gm-1];
 jy+=33*Math.floor(days/12053);days%=12053;jy+=4*Math.floor(days/1461);days%=1461;
 if(days>365){jy+=Math.floor((days-1)/365);days=(days-1)%365}
 const jm=days<186?1+Math.floor(days/31):7+Math.floor((days-186)/30),jd=1+(days<186?days%31:(days-186)%30);
 return [jy,jm,jd];
}
function showCalendar(){
 $('#mt-title').textContent='تقویم شمسی و میلادی';
 const body=$('#mt-body');body.innerHTML='<p>تاریخ را در یکی از تقویم‌ها وارد کنید تا معادل آن نمایش داده شود.</p><label for="mt-gdate">میلادی</label><input id="mt-gdate" type="date"><label for="mt-jdate">شمسی</label><input id="mt-jdate" inputmode="numeric" placeholder="۱۴۰۵/۰۸/۲۸" dir="ltr" style="width:100%;text-align:left"><div class="mt-result" id="mt-dateout" aria-live="polite"></div>';
 const g=$('#mt-gdate'),j=$('#mt-jdate'),out=$('#mt-dateout');
 const now=new Date();g.value=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
 function fromGregorian(){if(!g.value)return;const a=g.value.split('-').map(Number),v=gregorianToJalali(a[0],a[1],a[2]);j.value=v.join('/');out.textContent='میلادی: '+g.value+' | شمسی: '+v.join('/')}
 g.onchange=fromGregorian;
 j.onchange=()=>{try{const a=localizeDigits(j.value).replace(/-/g,'/').split('/').map(Number);if(a.length!==3)throw Error();const v=jalaliToGregorian(...a);g.value=v[0]+'-'+String(v[1]).padStart(2,'0')+'-'+String(v[2]).padStart(2,'0');out.textContent='شمسی: '+a.join('/')+' | میلادی: '+g.value}catch(e){out.textContent='تاریخ شمسی معتبر وارد کنید'}};
 fromGregorian();
}
const regulations=[
['۱','تعاریف','۱۳۹۲','اصطلاحات و تعاریف پایه مورد استفاده در مقررات ملی ساختمان.'],
['۲','نظامات اداری','۱۳۸۴','مسئولیت‌ها، صلاحیت‌ها، فرآیندهای اداری و کنترل ساختمان.'],
['۳','حفاظت ساختمان‌ها در مقابل حریق','۱۳۹۵','الزامات ایمنی حریق، راه‌های خروج و حفاظت اجزای ساختمان.'],
['۴','الزامات عمومی ساختمان‌ها','۱۴۰۳','الزامات عمومی معماری، ابعاد، فضاها و دسترسی‌ها.'],
['۵','مصالح و فرآورده‌های ساختمانی','۱۳۹۶','ویژگی‌ها و معیارهای پذیرش مصالح و فرآورده‌ها.'],
['۶','بارهای وارد بر ساختمان','۱۳۹۸','بارهای مرده، زنده، برف، باد و ترکیب بارها.'],
['۷','ژئوتکنیک و مهندسی پی','۱۴۰۰','شناسایی زمین، مطالعات ژئوتکنیک و طراحی پی.'],
['۸','طرح و اجرای ساختمان‌های با مصالح بنایی','۱۳۹۸','ضوابط طراحی و اجرای سازه‌های بنایی.'],
['۹','طرح و اجرای ساختمان‌های بتن‌آرمه','۱۳۹۹','ضوابط طراحی و اجرای اعضای بتن‌آرمه.'],
['۱۰','طرح و اجرای ساختمان‌های فولادی','۱۴۰۱','ضوابط طراحی، اتصالات و اجرای سازه‌های فولادی.'],
['۱۱','طرح و اجرای صنعتی ساختمان‌ها','۱۴۰۰','الزامات صنعتی‌سازی و روش‌های نوین ساخت.'],
['۱۲','ایمنی و حفاظت کار در حین اجرا','۱۴۰۳','ایمنی کارگاه، حفاظت کارکنان و عملیات اجرایی.'],
['۱۳','طرح و اجرای تأسیسات برقی ساختمان‌ها','۱۳۹۵','طراحی و اجرای تأسیسات الکتریکی ساختمان.'],
['۱۴','تأسیسات مکانیکی','۱۳۹۶','طراحی و اجرای سامانه‌های مکانیکی ساختمان.'],
['۱۵','آسانسورها و پلکان برقی','۱۳۹۲','الزامات نصب، ایمنی و بهره‌برداری آسانسور و پله‌برقی.'],
['۱۶','تأسیسات بهداشتی','۱۳۹۶','آب‌رسانی، فاضلاب و تجهیزات بهداشتی.'],
['۱۷','سامانه گاز طبیعی در ساختمان','۱۴۰۳','طراحی و اجرای لوله‌کشی و سامانه گاز طبیعی.'],
['۱۸','عایق‌بندی و تنظیم صدا','۱۳۹۶','کنترل انتقال صدا و الزامات آکوستیکی.'],
['۱۹','صرفه‌جویی در مصرف انرژی','۱۴۰۴','الزامات پوسته، تأسیسات و مدیریت مصرف انرژی.'],
['۲۰','علائم و تابلوها','۱۳۹۶','علائم ایمنی، تابلوها و نشانه‌گذاری ساختمان.'],
['۲۱','پدافند غیرعامل','۱۳۹۵','الزامات کاهش آسیب‌پذیری و تداوم عملکرد ساختمان.'],
['۲۲','مراقبت و نگهداری ساختمان‌ها','۱۳۹۲','بازرسی، نگهداری و ایمنی در دوره بهره‌برداری.'],
['۲۳','الزامات ترافیکی ساختمان‌ها','۱۴۰۱','الزامات پارکینگ، دسترسی و ترافیک ساختمان.'],
['۲۴','انطباق شهری ساختمان','۱۴۰۴','طبقه، تراکم، ارتفاع، سطح اشغال، استقرار و انطباق با سیمای شهری.']
];
function showRegs(){
 $('#mt-title').textContent='فهرست مباحث مقررات ملی ساختمان';
 const body=$('#mt-body');
 body.innerHTML='<p>فهرست ۲۴ مبحث به همراه موضوع و سال ویرایش درج‌شده برای راهنمایی اولیه. سال ویرایش یا اصلاحیه لازم‌الاجرا ممکن است تغییر کند؛ پیش از طراحی، اجرا یا استناد حقوقی، آخرین ابلاغیه رسمی را بررسی کنید.</p><input id="mt-regq" placeholder="جست‌وجوی مبحث..." style="width:100%"><div id="mt-reglist"></div><div class="mt-result">این بخش متن کامل آیین‌نامه یا جایگزین نسخه رسمی و اصلاحیه‌های ابلاغی نیست. فایل‌های دارای حق نشر نیز بدون مجوز در برنامه بازنشر نمی‌شوند.</div><a class="mt-reg-link" href="https://inbr.ir/" target="_blank" rel="noopener">مشاهده مرجع رسمی مقررات ملی ساختمان ↗</a>';
 const list=$('#mt-reglist');
 function render(q=''){list.innerHTML='';regulations.filter(r=>r.join(' ').includes(q.trim())).forEach(r=>{const d=document.createElement('details'),s=document.createElement('summary'),p=document.createElement('p'),m=document.createElement('div');s.textContent='مبحث '+r[0]+' – '+r[1];m.className='mt-reg-meta';m.textContent='ویرایش درج‌شده: '+r[2];p.textContent=r[3];d.append(s,m,p);list.appendChild(d)})}
 render();$('#mt-regq').addEventListener('input',e=>render(e.target.value));
}
function openPanel(which){overlay.classList.add('open');document.body.style.overflow='hidden';if(which==='calc')showCalc();if(which==='calendar')showCalendar();if(which==='regs')showRegs();translate(overlay)}
let stack=[],currentIndex=0;const originalSel=window.sel;
if(typeof originalSel==='function'){
 window.sel=function(i){if(i!==currentIndex)stack.push(currentIndex);currentIndex=i;originalSel(i);back.style.display=i===0?'none':'inline-block';history.pushState({metreyar:true,index:i},'','#section-'+i);translate(document.querySelector('#form'))};
 back.onclick=()=>{if(stack.length)history.back();else{originalSel(0);currentIndex=0;back.style.display='none'}};
 window.addEventListener('popstate',()=>{if(stack.length){currentIndex=stack.pop();originalSel(currentIndex);back.style.display=currentIndex===0?'none':'inline-block'}else if(currentIndex!==0){currentIndex=0;originalSel(0);back.style.display='none'}});
}
const observer=new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)translate(n);else if(n.nodeType===3)translate(n.parentElement||document.body)})));
observer.observe(document.body,{childList:true,subtree:true});
translate();

/* Live date, ownership notice, and local technical-file library */
const filesBtn=document.createElement('button');
filesBtn.type='button';filesBtn.textContent='📁 فایل‌های فنی';
filesBtn.onclick=()=>openPanel('files');
bar.appendChild(filesBtn);
const dateCredit=document.createElement('div');
dateCredit.id='mt-date-credit';
dateCredit.style.cssText='text-align:center;padding:4px 10px 9px;color:var(--mut);font-size:12px';
function refreshMetreyarDate(){
 const now=new Date();
 const fa=new Intl.DateTimeFormat('fa-IR-u-ca-persian',{dateStyle:'full'}).format(now);
 const en=new Intl.DateTimeFormat('en-CA',{dateStyle:'medium'}).format(now);
 dateCredit.textContent='امروز: '+fa+' | '+en;
}
refreshMetreyarDate();
setInterval(refreshMetreyarDate,60000);
if(header)header.insertAdjacentElement('afterend',dateCredit);
style.textContent += '.mt-file-item{border:1px solid var(--bd);border-radius:11px;padding:10px;margin:9px 0}.mt-file-item b,.mt-file-item small{display:block;overflow-wrap:anywhere}.mt-file-item small{color:var(--mut);font-size:12px}.mt-file-actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.mt-file-actions button{font:inherit;font-size:12px;padding:7px 10px;border:1px solid var(--bd);border-radius:9px;background:var(--res);color:var(--tx)}';
const FILE_DB='metreyar-technical-files-v1';
function openFileDb(){return new Promise((resolve,reject)=>{const req=indexedDB.open(FILE_DB,1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('files'))req.result.createObjectStore('files',{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function getTechnicalFiles(){const db=await openFileDb();return new Promise((resolve,reject)=>{const tx=db.transaction('files','readonly'),r=tx.objectStore('files').getAll();r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error);tx.oncomplete=()=>db.close()})}
async function saveTechnicalFile(file){const db=await openFileDb();return new Promise((resolve,reject)=>{const tx=db.transaction('files','readwrite'),id=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);tx.objectStore('files').put({id,name:file.name,type:file.type||'',size:file.size,addedAt:new Date().toISOString(),blob:file});tx.oncomplete=()=>{db.close();resolve(id)};tx.onerror=()=>{db.close();reject(tx.error)}})}
async function deleteTechnicalFile(id){const db=await openFileDb();return new Promise((resolve,reject)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').delete(id);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}})}
function showFiles(){
 $('#mt-title').textContent='مدیریت فایل‌های فنی';
 const body=$('#mt-body');
 body.innerHTML='<p>فایل‌های PDF را داخل برنامه مشاهده کنید. فایل‌های اصلی SAFE، STAAD.Pro و AutoCAD در همین دستگاه نگهداری و قابل دریافت‌اند؛ برای نمایش آن‌ها به PDF، ابتدا از نرم‌افزار اصلی خروجی PDF بگیرید و آن را نیز بارگذاری کنید.</p><label for="mt-tech-upload">افزودن فایل PDF یا فایل پروژه</label><input id="mt-tech-upload" type="file" multiple accept=".pdf,.fdb,.sdb,.std,.anl,.db,.dwg,.dxf,.dwt,.dws,.bak,application/pdf" style="width:100%"><div id="mt-tech-list" aria-live="polite"></div><div class="mt-result">فرمت‌های قابل نگهداری: PDF، SAFE، STAAD.Pro و AutoCAD. پیش‌نمایش داخل برنامه برای PDF فعال است؛ فایل‌های بومی نرم‌افزارها به برنامه اصلی خود نیاز دارند. فایل‌ها فقط روی همین دستگاه ذخیره می‌شوند.</div>';
 const host=$('#mt-tech-list'),picker=$('#mt-tech-upload');
 async function render(){
  host.textContent='در حال بارگذاری فهرست فایل‌ها…';
  try{
   const files=(await getTechnicalFiles()).sort((a,b)=>b.addedAt.localeCompare(a.addedAt));host.innerHTML='';
   if(!files.length){host.textContent='هنوز فایلی اضافه نشده است.';return}
   files.forEach(f=>{
    const item=document.createElement('div');item.className='mt-file-item';
    const name=document.createElement('b');name.textContent=f.name;
    const meta=document.createElement('small');meta.textContent=(f.size/1048576).toFixed(2)+' MB · '+new Date(f.addedAt).toLocaleDateString('fa-IR');
    const actions=document.createElement('div');actions.className='mt-file-actions';
    if(/\.pdf$/i.test(f.name)){
     const view=document.createElement('button');view.type='button';view.textContent='نمایش PDF';
     view.onclick=()=>{const url=URL.createObjectURL(f.blob);body.innerHTML='<button id="mt-pdf-back" type="button">↩ بازگشت به فایل‌ها</button><p></p><iframe title="نمایش فایل PDF" src="'+url+'" style="width:100%;height:65vh;border:1px solid var(--bd);border-radius:10px;background:white"></iframe>';body.querySelector('p').textContent=f.name;$('#mt-pdf-back').onclick=showFiles};
     actions.appendChild(view);
    }
    const download=document.createElement('button');download.type='button';download.textContent='دریافت فایل';
    download.onclick=()=>{const url=URL.createObjectURL(f.blob),a=document.createElement('a');a.href=url;a.download=f.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000)};
    actions.appendChild(download);
    const remove=document.createElement('button');remove.type='button';remove.textContent='حذف';
    remove.onclick=async()=>{if(confirm('این فایل از حافظه همین دستگاه حذف شود؟')){await deleteTechnicalFile(f.id);render()}};
    actions.appendChild(remove);item.append(name,meta,actions);host.appendChild(item);
   });
  }catch(e){host.textContent='ذخیره‌سازی فایل در این مرورگر در دسترس نیست.'}
 }
 picker.addEventListener('change',async()=>{
  const selected=Array.from(picker.files||[]);if(!selected.length)return;
  for(const f of selected){try{await saveTechnicalFile(f)}catch(e){alert('ذخیره فایل '+f.name+' انجام نشد؛ ممکن است فضای دستگاه کافی نباشد.');break}}
  picker.value='';render();
 });
 render();
}
const originalOpenPanel=openPanel;
openPanel=function(which){if(which==='files'){overlay.classList.add('open');document.body.style.overflow='hidden';showFiles();translate(overlay);return}originalOpenPanel(which)};


/* Cloud PDF conversion UI — requires the separately deployed Render service. */

/* Local-browser DWG conversion shortcut (third-party tool; file is processed in the browser). */
const dwgLocalBtn=document.createElement('button');
dwgLocalBtn.id='mt-dwg-local-converter';
dwgLocalBtn.type='button';
dwgLocalBtn.textContent='📐 تبدیل DWG بدون ثبت‌نام';
dwgLocalBtn.title='باز کردن ابزار تبدیل DWG در مرورگر؛ سرویس بیرونی است';
dwgLocalBtn.onclick=()=>{
 if(!confirm('ابزار تبدیل در یک وب‌سایت بیرونی باز می‌شود. طبق اعلام آن وب‌سایت، فایل در مرورگر پردازش می‌شود و بارگذاری نمی‌شود. برای نقشه‌های محرمانه ابتدا سیاست حریم خصوصی را بررسی کنید. ادامه می‌دهید؟'))return;
 window.open('https://drawcad.org/dwg-to-pdf','_blank','noopener,noreferrer');
};
bar.appendChild(dwgLocalBtn);

const convertBtn=document.createElement('button');
convertBtn.type='button';convertBtn.textContent='☁️ تبدیل فایل به PDF';
convertBtn.onclick=showCloudConverter;
bar.appendChild(convertBtn);
function showCloudConverter(){
 const old=document.getElementById('mt-cloud-converter');if(old)old.remove();
 const wrap=document.createElement('div');wrap.id='mt-cloud-converter';wrap.className='mt-overlay open';
 wrap.innerHTML='<section class="mt-dialog" role="dialog" aria-modal="true" aria-label="تبدیل فایل به PDF"><header><h2>تبدیل فایل مهندسی به PDF</h2><button type="button" id="mt-cloud-close">بستن ✕</button></header><p>فایل‌های DWG و DXF با سرویس CloudConvert به PDF تبدیل می‌شوند. PDF را می‌توانید مستقیماً دریافت کنید. فایل‌های SAFE و STAAD.Pro فعلاً باید از نرم‌افزار اصلی به PDF خروجی گرفته شوند.</p><label for="mt-converter-url">نشانی سرور تبدیل</label><input id="mt-converter-url" type="url" placeholder="https://your-service.onrender.com" style="width:100%;direction:ltr" /><p class="n">نشانی سرور پس از راه‌اندازی Render از داشبورد آن دریافت می‌شود.</p><label for="mt-converter-file">انتخاب فایل DWG، DXF یا PDF</label><input id="mt-converter-file" type="file" accept=".pdf,.dxf,.dwg" style="width:100%" /><label style="display:flex;gap:8px;align-items:flex-start"><input id="mt-cloud-consent" type="checkbox" style="width:auto;flex:0 0 auto;margin-top:6px" /><span>رضایت می‌دهم فایل انتخابی برای تبدیل به سرور ارسال شود. می‌دانم فایل ممکن است حاوی اطلاعات محرمانه پروژه باشد.</span></label><button type="button" id="mt-cloud-submit" class="go">ارسال و تبدیل به PDF</button><div id="mt-cloud-status" class="mt-result" aria-live="polite">برای شروع، نشانی سرور را وارد کنید.</div></section>';
 document.body.appendChild(wrap);
 const urlInput=wrap.querySelector('#mt-converter-url'),fileInput=wrap.querySelector('#mt-converter-file'),consent=wrap.querySelector('#mt-cloud-consent'),status=wrap.querySelector('#mt-cloud-status'),submit=wrap.querySelector('#mt-cloud-submit');
 urlInput.value=localStorage.getItem('metreyar.converterUrl')||'https://metreyar-converter.onrender.com';
 wrap.querySelector('#mt-cloud-close').onclick=()=>wrap.remove();
 wrap.addEventListener('click',ev=>{if(ev.target===wrap)wrap.remove()});
 submit.onclick=async()=>{
  let base=urlInput.value.trim();while(base.endsWith('/'))base=base.slice(0,-1);const file=fileInput.files&&fileInput.files[0];
  if(!base.startsWith('https://')){status.textContent='نشانی معتبر HTTPS سرور را وارد کنید.';return}
  if(!file){status.textContent='ابتدا یک فایل DWG، DXF یا PDF انتخاب کنید.';return}
  if(!consent.checked){status.textContent='برای ارسال فایل، رضایت خود را تأیید کنید.';return}
  if(file.size>20*1024*1024){status.textContent='حداکثر حجم فایل ۲۰ مگابایت است.';return}
  localStorage.setItem('metreyar.converterUrl',base);submit.disabled=true;status.textContent='در حال ارسال و تبدیل فایل…';
  try{
   const health=await fetch(base+'/health');if(!health.ok)throw new Error('سرور در دسترس نیست.');
   const ext=file.name.split('.').pop().toLowerCase();
   if(ext==='dwg'||ext==='dxf'){
    const data=new FormData();data.append('file',file,file.name);
    const response=await fetch(base+'/convert',{method:'POST',body:data});
    const result=await response.json();
    if(!response.ok||!result.ok)throw new Error(result.detail||result.error||'شروع تبدیل ناموفق بود.');
    const jobId=result.jobId;if(!jobId)throw new Error('شناسه تبدیل از سرور دریافت نشد.');
    status.textContent='فایل ارسال شد؛ در حال تبدیل در CloudConvert…';
    let finalResult=null;
    for(let attempt=0;attempt<60;attempt++){
     await new Promise(resolve=>setTimeout(resolve,2000));
     const check=await fetch(base+'/cloudconvert/status/'+encodeURIComponent(jobId));
     const state=await check.json();
     if(!check.ok||!state.ok)throw new Error(state.detail||state.error||'بررسی وضعیت تبدیل ناموفق بود.');
     if(state.status==='finished'){finalResult=state;break}
     if(state.status==='error')throw new Error(state.error||'CloudConvert نتوانست فایل را تبدیل کند.');
     status.textContent='در حال تبدیل فایل… ('+(attempt+1)+'/60)';
    }
    if(!finalResult)throw new Error('تبدیل بیش از دو دقیقه طول کشید؛ دوباره تلاش کنید.');
    if(!finalResult.downloadUrl)throw new Error('لینک دریافت PDF از سرویس دریافت نشد.');
    const link=document.createElement('a');link.href=finalResult.downloadUrl;link.target='_blank';link.rel='noopener noreferrer';link.textContent='دریافت فایل PDF';
    status.textContent='تبدیل با موفقیت انجام شد. ';status.appendChild(link);
   }else if(ext==='pdf'){
    const data=new FormData();data.append('file',file,file.name);
    const response=await fetch(base+'/convert',{method:'POST',body:data});
    if(!response.ok){let msg='تبدیل انجام نشد.';try{const j=await response.json();msg=j.detail||msg}catch(_){}throw new Error(msg)}
    const blob=await response.blob();if(blob.type!=='application/pdf')throw new Error('پاسخ سرور PDF معتبر نیست.');
    const objectUrl=URL.createObjectURL(blob),a=document.createElement('a');a.href=objectUrl;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(objectUrl),60000);
    status.textContent='فایل PDF آماده شد و دانلود آن آغاز شد.';
   }else{throw new Error('فقط فایل‌های DWG، DXF و PDF پشتیبانی می‌شوند.')}
  }catch(err){status.textContent='خطا: '+(err.message||'ارتباط با سرور برقرار نشد.');}
  finally{submit.disabled=false}
 };

 translate(wrap);
}

})();