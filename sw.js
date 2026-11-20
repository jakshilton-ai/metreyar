const CACHE='metreyar-v31';
const FILES=['./','./index.html','./manifest.json','./pro-tools.js','./enhancements.js','./price-center.js','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const url=new URL(r.url);
  const freshAsset=r.mode==='navigate'||/\\.(?:html|js|css|json)$/.test(url.pathname);
  if(freshAsset){
    e.respondWith(fetch(r).then(res=>{
      if(res&&res.ok)caches.open(CACHE).then(c=>c.put(r,res.clone()));
      return res;
    }).catch(async()=>{
      const c=await caches.open(CACHE);
      return (await c.match(r,{ignoreSearch:true}))||(r.mode==='navigate'?c.match('./index.html'):Response.error());
    }));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:true});
    if(hit)return hit;
    const res=await fetch(r);
    if(res&&res.ok)c.put(r,res.clone());
    return res;
  }).catch(()=>Response.error()));
});
