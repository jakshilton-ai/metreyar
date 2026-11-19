(() => {
'use strict';
const SOURCES = [
 {name:'آرزناب | بازار آهن و مصالح',desc:'میلگرد، تیرآهن، ورق، پروفیل، سیمان و بورس کالا؛ نرخ‌های بازار با زمان آخرین دریافت',url:'https://arznab.com/en/market',tag:'بازار و بورس'},
 {name:'الان چند؟ | قیمت مصالح',desc:'قیمت مصالح و آهن‌آلات؛ تفکیک قیمت بازار از آخرین معامله بورس و توضیح مالیات و حمل',url:'https://alanchand.com/building-materials-price',tag:'بازار ایران'},
 {name:'مصالح‌رو | مصالح ساختمانی',desc:'سیمان، شن، ماسه، گچ، آجر، بلوک و مصالح تکمیلی؛ قیمت پایه و زمان ثبت',url:'https://masalehro.com/prices/',tag:'مصالح و تجهیزات'},
 {name:'آهن آپ | تجهیزات و قالب بتن',desc:'قیمت جک سقفی، قالب بتن، سولجر و اقلام تجهیزات؛ تاریخ و واحد قیمت را بررسی کنید',url:'https://ahanup.com/product_category/%D8%AA%D8%AC%D9%87%DB%8C%D8%B2%D8%A7%D8%AA/',tag:'تجهیزات و ابزار'},
 {name:'ایران‌گاه | کرایه ماشین‌آلات',desc:'آمار کرایه ماشین‌آلات عمرانی و تجهیزات پروژه با تفکیک نوع دستگاه و واحد زمانی',url:'https://irangaah.ir/stats/machinery',tag:'اجاره ماشین‌آلات'},
 {name:'مصالح‌رو | اجاره تجهیزات',desc:'استعلام موجودی و نرخ اجاره تخته، بشکه، بالابر و تجهیزات کارگاهی',url:'https://masalehro.com/rentals/',tag:'اجاره تجهیزات'}
];
const KEY='metreyar.market-prices.v1';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(_){return {}}};
const write=x=>{try{localStorage.setItem(KEY,JSON.stringify(x));return true}catch(_){alert('ذخیره‌سازی در این دستگاه ممکن نیست.');return false}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nf=new Intl.NumberFormat('fa-IR',{maximumFractionDigits:2});
function init(){
 if(document.getElementById('mt-market-btn'))return;
 const css=document.createElement('style');
 css.textContent=`
 body{background-image:radial-gradient(ellipse at 85% 0%,rgba(8,126,139,.10),transparent 38%),linear-gradient(180deg,var(--bg),var(--bg2))} .hero{background:linear-gradient(100deg,#08223deF,#155b80a8),url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85') center 48%/cover!important;border-radius:0 0 18px 18px;box-shadow:0 12px 30px #071b3025} .card{border-radius:18px;box-shadow:0 8px 24px #071b3010} .tile{border-radius:16px;transition:transform .18s ease,box-shadow .18s ease} .tile:active{transform:scale(.97)} #mt-market-btn{position:fixed;z-index:48;bottom:76px;left:14px;border:0;border-radius:28px;padding:12px 16px;background:#087e8b;color:white;font:inherit;font-weight:800;box-shadow:0 8px 24px #001b2b40;cursor:pointer}
 #mt-market{position:fixed;z-index:120;inset:0;background:#071727b8;display:none;align-items:center;justify-content:center;padding:12px;backdrop-filter:blur(8px)}
 #mt-market.open{display:flex}.mm-panel{width:min(760px,100%);max-height:92vh;overflow:auto;border-radius:22px;background:var(--card,#fff);color:var(--tx,#18202b);border:1px solid var(--bd,#d5dce6);box-shadow:0 24px 80px #0006}
 .mm-hero{position:relative;min-height:180px;padding:24px;color:white;background:linear-gradient(100deg,#071d32eF,#0a5276a6),url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85') center/cover}
 .mm-hero h2{font-size:24px;margin:0}.mm-hero p{max-width:490px;font-size:13px;margin:6px 0 0;color:#e5f4ff}
 .mm-close{position:absolute;left:16px;top:16px;border:1px solid #ffffff77;border-radius:50%;width:38px;height:38px;background:#ffffff20;color:white;font-size:20px;cursor:pointer}
 .mm-body{padding:16px}.mm-live{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
 .mm-source{border:1px solid var(--bd);border-radius:15px;padding:13px;background:var(--bg);min-width:0}
 .mm-tag{font-size:10px;color:#087e8b;font-weight:800}.mm-source b{display:block;margin:4px 0}.mm-source p{font-size:12px;color:var(--mut);margin:0 0 10px;line-height:1.7}
 .mm-link{display:inline-flex;color:var(--pri);font-size:12px;font-weight:800;text-decoration:none}
 .mm-note{font-size:12px;color:var(--mut);padding:11px 13px;background:var(--res);border-radius:12px;margin:12px 0}
 .mm-title{font-size:16px;margin:18px 0 8px}.mm-form{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px}
 .mm-form input,.mm-form select{min-width:0;width:100%;border:1px solid var(--bd);border-radius:10px;padding:10px;background:var(--bg);color:var(--tx);font:inherit;font-size:13px}
 .mm-form button{border:0;border-radius:10px;padding:8px 14px;background:var(--pri);color:var(--prc);font:inherit;cursor:pointer}
 .mm-table{width:100%;border-collapse:collapse;font-size:12px}.mm-table th,.mm-table td{padding:9px 6px;border-bottom:1px solid var(--bd);text-align:right}.mm-table th{color:var(--mut)}
 .mm-delete{border:0;background:transparent;color:#c33;font:inherit;cursor:pointer}
 @media(max-width:560px){.mm-live{grid-template-columns:1fr}.mm-form{grid-template-columns:1fr 1fr}.mm-form button{grid-column:1/-1}.mm-hero{min-height:160px}}
 `;
 document.head.appendChild(css);
 const btn=document.createElement('button');btn.id='mt-market-btn';btn.textContent='▤ قیمت روز بازار';btn.addEventListener('click',()=>{modal.classList.add('open');render()});document.body.appendChild(btn);
 const modal=document.createElement('div');modal.id='mt-market';modal.innerHTML=`<section class="mm-panel" role="dialog" aria-modal="true" aria-labelledby="mm-heading">
 <div class="mm-hero"><button class="mm-close" id="mm-close" aria-label="بستن">×</button><h2 id="mm-heading">رادار قیمت مصالح و تجهیزات</h2><p>دسترسی سریع به نرخ‌های آنلاین بازار، ثبت قیمت استعلام‌شده و نگهداری فهرست خرید پروژه</p></div>
 <div class="mm-body"><div class="mm-note"><b>شفافیت قیمت:</b> نرخ‌های بازار از منابع آنلاین باز می‌شوند؛ به‌دلیل نبود API عمومیِ تأییدشده، قیمت زنده درون برنامه جعل یا حدس زده نمی‌شود. قیمت نهایی را با شهر، برند، مالیات و کرایه حمل کنترل کنید.</div>
 <h3 class="mm-title">منابع آنلاین قیمت</h3><div class="mm-live" id="mm-sources"></div>
 <h3 class="mm-title">ثبت قیمت استعلام‌شده برای پروژه</h3>
 <form class="mm-form" id="mm-form"><input id="mm-item" required maxlength="70" placeholder="مثلاً میلگرد ۱۴"><input id="mm-price" required inputmode="decimal" placeholder="قیمت (تومان)"><select id="mm-unit"><option>کیلوگرم</option><option>کیسه</option><option>تن</option><option>متر مکعب</option><option>متر مربع</option><option>شاخه</option><option>عدد</option><option>دستگاه</option></select><button type="submit">ثبت قیمت</button></form>
 <div id="mm-list"></div><p class="mm-note">قیمت‌های ثبت‌شده فقط روی همین دستگاه ذخیره می‌شوند و برای برآورد شخصی‌اند؛ قیمت بازار به‌صورت خودکار همگام‌سازی نمی‌شود.</p></div></section>`;
 document.body.appendChild(modal);
 document.getElementById('mm-close').onclick=()=>modal.classList.remove('open');
 modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
 document.getElementById('mm-form').addEventListener('submit',e=>{e.preventDefault();const item=document.getElementById('mm-item').value.trim(),price=Number(document.getElementById('mm-price').value.replace(/[٬,،]/g,'')),unit=document.getElementById('mm-unit').value;if(!item||!Number.isFinite(price)||price<=0){alert('نام کالا و قیمت معتبر وارد کنید.');return}const data=read();data.items=Array.isArray(data.items)?data.items:[];data.items.push({id:Date.now(),item,price,unit,date:new Date().toLocaleString('fa-IR')});write(data);e.target.reset();render()});
 function render(){
 document.getElementById('mm-sources').innerHTML=SOURCES.map(s=>`<article class="mm-source"><span class="mm-tag">${s.tag}</span><b>${s.name}</b><p>${s.desc}</p><a class="mm-link" href="${s.url}" target="_blank" rel="noopener noreferrer">مشاهده قیمت‌های آنلاین ↗</a></article>`).join('');
 const items=read().items||[];const host=document.getElementById('mm-list');
 host.innerHTML=items.length?`<div style="overflow:auto;margin-top:12px"><table class="mm-table"><thead><tr><th>کالا</th><th>قیمت</th><th>واحد</th><th>تاریخ ثبت</th><th></th></tr></thead><tbody>${items.slice().reverse().map(x=>`<tr><td>${esc(x.item)}</td><td><b>${nf.format(x.price)}</b></td><td>${esc(x.unit)}</td><td>${esc(x.date)}</td><td><button class="mm-delete" data-del="${x.id}">حذف</button></td></tr>`).join('')}</tbody></table></div>`:'<p style="font-size:12px;color:var(--mut)">هنوز قیمتی برای پروژه ثبت نکرده‌اید.</p>';
 host.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const d=read();d.items=(d.items||[]).filter(x=>String(x.id)!==b.dataset.del);write(d);render()});
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

/* Financial market dashboard: gold, USD and Tehran market index. */
function initFinancialMarket(){
 if(document.getElementById('mt-finance-btn'))return;
 const style=document.createElement('style');
 style.textContent=`
 #mt-finance-btn{position:fixed;z-index:48;bottom:132px;left:14px;border:0;border-radius:28px;padding:12px 16px;background:#173f68;color:#fff;font:inherit;font-weight:800;box-shadow:0 8px 24px #001b2b40;cursor:pointer}
 #mt-finance{position:fixed;z-index:125;inset:0;background:#071727c9;display:none;align-items:center;justify-content:center;padding:12px;backdrop-filter:blur(8px)}
 #mt-finance.open{display:flex}.mf-panel{width:min(760px,100%);max-height:92vh;overflow:auto;border-radius:22px;background:var(--card,#fff);color:var(--tx,#18202b);border:1px solid var(--bd);box-shadow:0 24px 80px #0006}
 .mf-head{padding:22px;color:white;background:linear-gradient(110deg,#102b47,#087e8b);position:relative}.mf-head h2{margin:0;font-size:22px}.mf-head p{font-size:12px;margin:7px 0 0;color:#e4f5ff}
 .mf-close{position:absolute;left:14px;top:14px;border:1px solid #ffffff88;border-radius:50%;width:36px;height:36px;background:#ffffff20;color:white;font-size:20px}
 .mf-body{padding:15px}.mf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
 .mf-card{border:1px solid var(--bd);border-radius:15px;padding:13px;background:var(--bg)}.mf-card small{color:var(--mut);display:block}.mf-card b{font-size:19px;display:block;margin:7px 0;overflow-wrap:anywhere}.mf-card span{font-size:11px;color:var(--mut)}
 .mf-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.mf-actions a,.mf-actions button{border:0;border-radius:10px;padding:10px 13px;background:var(--pri);color:var(--prc);font:inherit;text-decoration:none}
 .mf-note{font-size:11px;line-height:1.8;color:var(--mut);padding:10px;background:var(--res);border-radius:11px;margin-top:12px}
 @media(max-width:520px){.mf-grid{grid-template-columns:1fr}.mf-card b{font-size:18px}}
 `;
 document.head.appendChild(style);
 const btn=document.createElement('button');btn.id='mt-finance-btn';btn.textContent='📈 طلا، دلار و بورس';document.body.appendChild(btn);
 const modal=document.createElement('div');modal.id='mt-finance';modal.innerHTML=`<section class="mf-panel" role="dialog" aria-modal="true" aria-labelledby="mf-title">
 <header class="mf-head"><button class="mf-close" id="mf-close" aria-label="بستن">×</button><h2 id="mf-title">رادار بازارهای مالی</h2><p>قیمت طلا، دلار و شاخص بورس ایران با زمان آخرین دریافت</p></header>
 <div class="mf-body"><div id="mf-status" class="mf-note">برای دریافت آخرین داده‌ها، دکمه به‌روزرسانی را بزنید.</div><div class="mf-grid" id="mf-cards"></div>
 <div class="mf-actions"><button id="mf-refresh">↻ به‌روزرسانی قیمت‌ها</button><a href="https://www.tsetmc.com/" target="_blank" rel="noopener noreferrer">مشاهده بورس تهران ↗</a><a href="https://talasanj.info/" target="_blank" rel="noopener noreferrer">منبع قیمت طلا و دلار ↗</a></div>
 <p class="mf-note">قیمت طلا و دلار از طلاسنج دریافت می‌شود و با نام منبع نمایش داده می‌شود. شاخص بورس در صورت در دسترس بودن سرویس بازار نمایش داده خواهد شد؛ در غیر این صورت از لینک بورس تهران استفاده کنید. داده‌ها ممکن است با تأخیر همراه باشند و توصیه سرمایه‌گذاری نیستند.</p></div></section>`;
 document.body.appendChild(modal);
 const close=()=>modal.classList.remove('open');btn.onclick=()=>{modal.classList.add('open');loadFinance()};modal.querySelector('#mf-close').onclick=close;modal.addEventListener('click',e=>{if(e.target===modal)close()});modal.querySelector('#mf-refresh').onclick=loadFinance;
 const nf2=new Intl.NumberFormat('fa-IR',{maximumFractionDigits:2});
 function card(label,value,unit,change,updated){const ch=Number(change);const trend=Number.isFinite(ch)?' · '+(ch>0?'▲ ':ch<0?'▼ ':'')+nf2.format(ch)+'٪':'';return '<article class="mf-card"><small>'+label+'</small><b>'+value+'</b><span>'+unit+trend+(updated?' · '+updated:'')+'</span></article>'}
 async function loadFinance(){
  const status=modal.querySelector('#mf-status'),host=modal.querySelector('#mf-cards'),refresh=modal.querySelector('#mf-refresh');
  refresh.disabled=true;status.textContent='در حال دریافت داده‌های بازار…';
  try{
   const base=(localStorage.getItem('metreyar.converterUrl')||'https://metreyar-converter.onrender.com').replace(/\/$/,'');
   const res=await fetch(base+'/market/financial');if(!res.ok)throw new Error('سرویس قیمت موقتاً در دسترس نیست.');
   const data=await res.json();const prices=data.prices||{};const out=[];
   const fmt=(v)=>Number.isFinite(Number(v))?nf2.format(Number(v)):'—';
   if(prices.ounce)out.push(card('طلای جهانی · هر اونس',fmt(prices.ounce.price),'دلار آمریکا',prices.ounce.change_pct,prices.ounce.updated_at||''));
   if(prices.gram18)out.push(card('طلای ۱۸ عیار · هر گرم',fmt(prices.gram18.price),'تومان',prices.gram18.change_pct,prices.gram18.updated_at||''));
   if(prices.gram24)out.push(card('طلای ۲۴ عیار · هر گرم',fmt(prices.gram24.price),'تومان',prices.gram24.change_pct,prices.gram24.updated_at||''));
   if(prices.mazaneh)out.push(card('مثقال طلا',fmt(prices.mazaneh.price),'تومان',prices.mazaneh.change_pct,prices.mazaneh.updated_at||''));
   if(prices.usd)out.push(card('دلار آزاد تهران',fmt(prices.usd.price),'تومان',prices.usd.change_pct,prices.usd.updated_at||''));
   if(data.tedpix&&data.tedpix.value)out.push(card('شاخص کل بورس تهران',fmt(data.tedpix.value),'واحد',data.tedpix.change_pct,data.tedpix.updated_at||''));
   host.innerHTML=out.join('')||'<p>داده‌ای از سرویس دریافت نشد.</p>';
   status.textContent='آخرین دریافت: '+(data.updated_at?new Date(data.updated_at).toLocaleString('fa-IR'):'زمان نامشخص')+' · منبع طلا و ارز: طلاسنج';
  }catch(err){host.innerHTML='<article class="mf-card"><small>وضعیت دریافت</small><b>فعلاً داده زنده دریافت نشد</b><span>برای مشاهده مستقیم از پیوندهای منابع استفاده کنید.</span></article>';status.textContent=err.message||'خطا در دریافت اطلاعات.'}
  finally{refresh.disabled=false}
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initFinancialMarket);else initFinancialMarket();


/* Persistent moving market ticker at the very top of the app */
function initMetreyarTicker(){
 if(document.getElementById('mt-market-ticker'))return;
 const css=document.createElement('style');
 css.textContent=`
 #mt-market-ticker{direction:rtl;position:relative;z-index:60;display:flex;align-items:center;gap:0;width:100%;height:42px;overflow:hidden;background:linear-gradient(90deg,#071d32,#0c4561);color:#fff;border-bottom:1px solid #ffffff22;font-family:inherit}
 #mt-market-ticker .mtt-label{flex:0 0 auto;padding:0 12px;font-size:11px;font-weight:900;color:#b9f3df;border-left:1px solid #ffffff30}
 #mt-market-ticker .mtt-window{flex:1;overflow:hidden;white-space:nowrap}
 #mt-market-ticker .mtt-track{display:inline-flex;align-items:center;gap:34px;min-width:max-content;padding-right:100%;animation:mtTickerMove 34s linear infinite}
 #mt-market-ticker:hover .mtt-track{animation-play-state:paused}
 #mt-market-ticker .mtt-item{font-size:12px;font-weight:700;display:inline-flex;gap:7px;align-items:center}
 #mt-market-ticker .mtt-item b{color:#ffe08a;font-variant-numeric:tabular-nums}
 #mt-market-ticker .mtt-dot{width:5px;height:5px;border-radius:50%;background:#42d6a4;display:inline-block}
 #mt-market-ticker .mtt-state{font-size:11px;color:#dcecf5;padding:0 10px;white-space:nowrap} #mt-market-ticker .mtt-credit{flex:0 0 auto;color:#b9f3df;font-size:10px;text-decoration:underline;padding:0 8px;white-space:nowrap}
 @keyframes mtTickerMove{from{transform:translateX(0)}to{transform:translateX(50%)}}
 @media(prefers-reduced-motion:reduce){#mt-market-ticker .mtt-track{animation:none}}
 `;
 document.head.appendChild(css);
 const bar=document.createElement('div');bar.id='mt-market-ticker';bar.setAttribute('aria-label','نوار متحرک قیمت بازار');
 bar.innerHTML='<span class="mtt-label">بازار امروز</span><div class="mtt-window"><div class="mtt-track" id="mtt-track"><span class="mtt-item">در حال دریافت قیمت آنلاین…</span></div></div><span class="mtt-state" id="mtt-state">اتصال</span><a class="mtt-credit" href="https://talasanj.info" target="_blank" rel="noopener">قیمت‌ها از طلاسنج</a>';
 document.body.insertBefore(bar,document.body.firstChild);
 const track=bar.querySelector('#mtt-track'),state=bar.querySelector('#mtt-state');
 const fmt=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?new Intl.NumberFormat('fa-IR',{maximumFractionDigits:2}).format(n):'—'};
 const item=(name,value,unit)=>'<span class="mtt-item"><i class="mtt-dot"></i>'+name+' <b>'+fmt(value)+'</b> '+unit+'</span>';
 async function refresh(){
  try{
   const base=(localStorage.getItem('metreyar.converterUrl')||'https://metreyar-converter.onrender.com').replace(/\/$/,'');
   const r=await fetch(base+'/market/financial',{cache:'no-store'});if(!r.ok)throw new Error('منبع قیمت فعلاً پاسخ نمی‌دهد');
   const d=await r.json(),p=d.prices||{},items=[];
   const add=(k,label,unit)=>{if(p[k]&&p[k].price!=null)items.push(item(label,p[k].price,unit))};
   add('ounce','اونس جهانی طلا','دلار');
   add('gram18','طلای ۱۸ عیار','تومان');
   add('gram24','طلای ۲۴ عیار','تومان');
   add('mazaneh','مثقال طلا','تومان');
   add('usd','دلار آزاد','تومان');
   if(d.tedpix&&d.tedpix.value!=null)items.push(item('شاخص کل بورس',d.tedpix.value,'واحد'));
   if(!items.length)throw new Error('داده معتبر دریافت نشد');
   const content=items.join('<span class="mtt-item" aria-hidden="true"> ◆ </span>');
   track.innerHTML=content+content;
   state.textContent=d.stale?'آخرین داده ذخیره‌شده':'آنلاین';
   state.title=d.updated_at?'آخرین دریافت: '+new Date(d.updated_at).toLocaleString('fa-IR'):'';
  }catch(e){
   track.innerHTML='<span class="mtt-item">قیمت زنده فعلاً در دسترس نیست؛ برای جلوگیری از نمایش نرخ اشتباه، عددی نشان داده نمی‌شود.</span>';
   state.textContent='عدم اتصال';
  }
 }
 refresh();setInterval(refresh,300000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMetreyarTicker);else initMetreyarTicker();

})();