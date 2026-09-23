const CACHE_NAME = 'paraiso-fm-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Falha parcial ao pré-armazenar assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Não interceptar nem tentar cachear streams de áudio ou chamadas externas dinâmicas
  if (
    requestUrl.protocol.startsWith('chrome-extension') ||
    event.request.method !== 'GET' ||
    event.request.headers.get('range') ||
    requestUrl.pathname.includes('/stream') ||
    requestUrl.hostname.includes('fastcast4u.com') ||
    requestUrl.hostname.includes('xcast.com.br') ||
    requestUrl.hostname.includes('ipapi.co') ||
    requestUrl.hostname.includes('google-analytics.com')
  ) {
    return;
  }

  // Network First para a página e scripts, com fallback para o cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// Mensagem para forçar atualização
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
