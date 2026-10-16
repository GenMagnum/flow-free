// Cache only public application files, never receipts or financial records.
const CACHE='flow-free-static-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/flow-192.png','./icons/flow-512.png','./icons/flow-180.png','./icons/flow-maskable-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.origin!==location.origin)return;const allowed=FILES.map(p=>new URL(p,self.registration.scope).pathname);if(!allowed.includes(url.pathname))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)))}return r}).catch(async()=>await caches.match(e.request)||await caches.match(new URL('./index.html',self.registration.scope))||new Response('Open Flow online once to enable offline access.',{status:503})))})
