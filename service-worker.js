self.addEventListener("install", (event) => {
  self.skipWaiting(); // ⚠️ Ativa imediatamente
  event.waitUntil(
    caches.open("paraiso-cache-v2").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./icone-192.png", 
        "./icone-512.png"
      ]);
    })
  );
});

// ⚠️ EVENTO NOVO - LIMPA CACHE ANTIGO
self.addEventListener("activate", (event) => {
  self.clients.claim(); // Toma controle das páginas
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // ⚠️ Remove SOMENTE o cache antigo
          if (cacheName === "paraiso-cache") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
