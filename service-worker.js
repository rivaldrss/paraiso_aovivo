// Configurações
const CACHE_NAME = 'turbinal-paraiso-v2'; // MUDE ESTE NOME A CADA ATUALIZAÇÃO
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/icone-192.png',
  '/icone-512.png',
  '/turbinal_paraiso.png'
];

// Instalação - cache dos arquivos
self.addEventListener('install', event => {
  console.log('Service Worker instalando...');
  self.skipWaiting(); // IMPORTANTE: Ativa imediatamente
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação - limpa caches antigos
self.addEventListener('activate', event => {
  console.log('Service Worker ativado!');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Assume controle imediato de todas as abas
      return self.clients.claim();
    })
  );
});

// Estratégia de Cache: Cache First, com fallback para network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrou
        if (response) {
          return response;
        }
        
        // Se não encontrou no cache, busca na rede
        return fetch(event.request).then(networkResponse => {
          // Opcional: cache da nova resposta
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
  );
});

// Escuta mensagens para pular a espera
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
