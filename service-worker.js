self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('BG_Jornal') || e.request.url.includes('index.html') || e.request.url.includes('appradio')) {
    return e.respondWith(fetch(e.request, {cache:'no-store'}).catch(()=>fetch(e.request)));
  }
  if (e.request.url.includes('stream')) return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
