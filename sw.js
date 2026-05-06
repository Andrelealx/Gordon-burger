/* ============================================================
   GORDON — Service Worker
   Cache-first para assets, network-first para HTML
   ============================================================ */

const CACHE_NAME = 'gordon-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/animations.js',
  '/js/cursor.js',
  '/assets/images/burger-the-copy.jpg',
  '/assets/images/burger-creamy-jalapeno.jpg',
  '/assets/images/burger-gordon-blue.jpg',
  '/assets/images/burger-the-down.jpg',
  '/assets/images/about-01.jpg',
  '/assets/images/experience-bg.jpg',
  '/assets/images/hero-bg.jpg',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
];

// Install — pré-cacheia assets críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate — limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — cache-first para imagens/css/js, network-first para HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Só intercepta mesma origem
  if (url.origin !== location.origin) return;

  const isAsset = /\.(jpg|jpeg|png|webp|gif|svg|css|js|woff2|mp4)$/i.test(url.pathname);

  if (isAsset) {
    // Cache-first
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
      )
    );
  } else {
    // Network-first com fallback para cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
