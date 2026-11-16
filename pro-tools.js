(() => {
  'use strict';
  const KEY = 'metreyar.projects.v1';
  const read = () => { try { const x = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(x) ? x : []; } catch (_) { return []; } };
  const write = x => { try { localStorage.setItem(KEY, JSON.stringify(x)); return true; } catch (_) { alert('فضای ذخیره‌سازی مرورگر در دسترس نیست.'); return false; } };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const download = (name, data, type) => { const blob = new Blob([data], {type:type}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1200); };
  const csvCell = x => '"' + String(x == null ? '' : x).replace(/"/g,'""').replace(/\r?\n/g,' | ') + '"';
  const safeCell = x => { const s=String(x == null ? '' : x); return /^[=+@\-	\r]/.test(s) ? "'" + s : s; };
  const xml = x => String(x == null ? '' : x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  const exportXls = () => {
    const items=read();
    if (!items.length) { alert('هنوز برآوردی ذخیره نشده است.'); return; }
    const rows=[['نام پروژه','بخش محاسبه','تاریخ ذخیره','جزئیات برآورد'],...items.map(x=>[x.project,x.section,x.date,x.details])];
    const sheet=rows.map(row=>'<Row>'+row.map(v=>'<Cell><Data ss:Type="String">'+xml(safeCell(v))+'</Data></Cell>').join('')+'</Row>').join('');
    const book='<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="برآوردها"><Table>'+sheet+'</Table></Worksheet></Workbook>';
    download('metreyar-estimates.xls',book,'application/vnd.ms-excel;charset=utf-8');
  };
  const exportExcel = () => {
    const items=read();
    if (!items.length) { alert('هنوز برآوردی ذخیره نشده است.'); return; }
    const rows=[['نام پروژه','بخش محاسبه','تاریخ ذخیره','جزئیات برآورد']];
    items.forEach(x=>rows.push([safeCell(x.project),safeCell(x.section),safeCell(x.date),safeCell(x.details)]));
    const csv='\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
    download('metreyar-estimates.csv',csv,'text/csv;charset=utf-8');
  };
  const backup = () => download('metreyar-backup.json', JSON.stringify({app:'metreyar',version:1,exportedAt:new Date().toISOString(),estimates:read()},null,2),'application/json;charset=utf-8');
  const refreshList = () => {
    const host=document.getElementById('my-estimates'); if(!host) return;
    const items=read();
    if(!items.length){host.innerHTML='<p class="mt-empty">هنوز برآوردی ذخیره نشده است. پس از محاسبه، دکمه «ذخیره در پروژه» را بزنید.</p>';return;}
    const total=items.length;
    const search=document.getElementById('mt-search');
    const q=(search&&search.value||'').trim().toLocaleLowerCase();
    const visible=items.slice().reverse().filter(x=>[x.project,x.section,x.details].join(' ').toLocaleLowerCase().includes(q));
    host.innerHTML='<div class="mt-stats"><b>'+total.toLocaleString('fa-IR')+' برآورد ذخیره‌شده</b><span>'+new Set(items.map(x=>x.project)).size.toLocaleString('fa-IR')+' پروژه</span></div>'+visible.map(x=>'<article class="mt-item"><div><b>'+esc(x.section)+'</b><small>'+esc(x.project)+' · '+esc(x.date)+'</small><p>'+esc(x.details)+'</p><div class="mt-item-actions"><button type="button" data-edit="'+esc(x.id)+'">تغییر نام پروژه</button><button type="button" data-del="'+esc(x.id)+'">حذف</button></div></div></article>').join('')+(visible.length?'':'<p class="mt-empty">موردی با این جست‌وجو پیدا نشد.</p>');
    host.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click',()=>{const list=read();const item=list.find(x=>x.id===b.dataset.edit);if(!item)return;const name=prompt('نام جدید پروژه:',item.project);if(name===null)return;item.project=name.trim()||item.project;if(write(list))refreshList();}));
    host.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{if(confirm('این برآورد حذف شود؟')){write(read().filter(x=>x.id!==b.dataset.del));refreshList();}}));
  };
  const init = () => {
    if(document.getElementById('metreyar-tools-btn')) return;
    const style=document.createElement('style');
    style.textContent='#metreyar-tools-btn{position:fixed;z-index:50;bottom:18px;left:14px;border:0;border-radius:30px;padding:12px 17px;background:#0d47a1;color:#fff;font:inherit;font-weight:bold;box-shadow:0 5px 20px #0003;cursor:pointer}#metreyar-tools{position:fixed;z-index:100;inset:0;background:#10182799;display:none;align-items:center;justify-content:center;padding:14px}#metreyar-tools.open{display:flex}.mt-panel{width:min(620px,100%);max-height:88vh;overflow:auto;background:var(--card,#fff);color:var(--tx,#18202b);border:1px solid var(--bd,#d5dce6);border-radius:18px;padding:18px;box-shadow:0 18px 60px #0004}.mt-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.mt-head h2{margin:0;font-size:20px}.mt-sub{font-size:13px;color:var(--mut,#667);margin:5px 0 14px}.mt-actions{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.mt-actions button,.mt-item button,.mt-save{border:1px solid var(--bd,#ccd);border-radius:10px;padding:9px 12px;background:var(--res,#e3f0ff);color:var(--tx,#18202b);font:inherit;cursor:pointer}.mt-actions .primary,.mt-save{background:var(--pri,#1565c0);color:var(--prc,#fff);border-color:var(--pri,#1565c0)}.mt-item{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;border-top:1px solid var(--bd,#ddd);padding:12px 0}.mt-item small{display:block;color:var(--mut,#667);margin-top:3px}.mt-item p{font-size:13px;margin:6px 0 0;white-space:pre-wrap}.mt-item button{color:#b42318;background:transparent}.mt-item-actions{display:flex;gap:6px;margin-top:8px}.mt-item-actions button:first-child{color:var(--pri,#1565c0)}.mt-stats{display:flex;justify-content:space-between;gap:10px;padding:8px 0;color:var(--pri,#1565c0);font-size:13px}.mt-empty{font-size:13px;color:var(--mut,#667);padding:10px 0}.mt-save{display:block;width:100%;margin-top:10px}';
    document.head.appendChild(style);
    const btn=document.createElement('button');btn.id='metreyar-tools-btn';btn.type='button';btn.textContent='▦ دفتر پروژه';btn.addEventListener('click',()=>{document.getElementById('metreyar-tools').classList.add('open');refreshList();});document.body.appendChild(btn);
    const modal=document.createElement('div');modal.id='metreyar-tools';modal.innerHTML='<section class="mt-panel" role="dialog" aria-modal="true" aria-labelledby="mt-title"><div class="mt-head"><h2 id="mt-title">دفتر پروژه‌های متره‌یار</h2><button type="button" id="mt-close" class="mt-actions">بستن ✕</button></div><p class="mt-sub">برآوردها روی همین دستگاه ذخیره می‌شوند؛ برای انتقال به دستگاه دیگر از پشتیبان JSON استفاده کنید.</p><div class="mt-actions"><button type="button" class="primary" id="mt-xls">فایل Excel</button><button type="button" id="mt-excel">خروجی CSV</button><button type="button" id="mt-backup">پشتیبان کامل</button><button type="button" id="mt-restore">بازیابی پشتیبان</button><input id="mt-file" type="file" accept=".json,application/json" hidden></div><label for="mt-search" class="mt-sub">جست‌وجوی پروژه و برآورد</label><input id="mt-search" type="search" placeholder="نام پروژه یا نوع محاسبه..." style="width:100%;direction:rtl"><div id="my-estimates"></div></section>';
    document.body.appendChild(modal);
    document.getElementById('mt-close').addEventListener('click',()=>modal.classList.remove('open'));
    modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open');});
    document.getElementById('mt-excel').addEventListener('click',exportExcel);
    document.getElementById('mt-xls').addEventListener('click',exportXls);
    document.getElementById('mt-search').addEventListener('input',refreshList);
    document.getElementById('mt-backup').addEventListener('click',backup);
    document.getElementById('mt-restore').addEventListener('click',()=>document.getElementById('mt-file').click());
    document.getElementById('mt-file').addEventListener('change',async e=>{
      const f=e.target.files&&e.target.files[0]; if(!f)return;
      try{const data=JSON.parse(await f.text());const list=Array.isArray(data)?data:data.estimates;if(!Array.isArray(list))throw new Error('invalid');if(!confirm('پشتیبان بازیابی شود؟ برآوردهای فعلی با اطلاعات پشتیبان ادغام می‌شوند.'))return;const merged=read();const ids=new Set(merged.map(x=>x.id));list.forEach(x=>{if(x&&x.id&&!ids.has(x.id))merged.push(x);});write(merged);refreshList();alert('بازیابی انجام شد.');}catch(_){alert('فایل پشتیبان معتبر نیست.');}e.target.value='';
    });
    const out=document.getElementById('out');
    if(out){const observer=new MutationObserver(()=>{
      const result=out.querySelector('.res');if(!result||out.querySelector('.mt-save'))return;
      const save=document.createElement('button');save.type='button';save.className='mt-save';save.textContent='＋ ذخیره این برآورد در دفتر پروژه';
      save.addEventListener('click',()=>{
        const section=(document.querySelector('.tabs .on')||{}).innerText||'برآورد';
        const project=prompt('نام پروژه را وارد کنید:','پروژه من');if(project===null)return;
        const details=result.innerText;
        const item={id:(Date.now().toString(36)+Math.random().toString(36).slice(2,7)),project:project.trim()||'پروژه من',section:section.trim(),date:new Date().toLocaleString('fa-IR'),details:details};
        const items=read();items.push(item);if(write(items)){save.textContent='ذخیره شد ✓';}
      });
      out.appendChild(save);
    });observer.observe(out,{childList:true,subtree:true});}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();