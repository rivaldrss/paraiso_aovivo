self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("paraiso-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./icone-192.png",
        "./icone-512.png"
      ]);
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
