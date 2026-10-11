// YSSCHOOL Service Worker (오프라인 캐싱 및 교실 PWA 완벽 지원)
const CACHE_NAME = 'ysschool-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/morning',
  '/showcase',
  '/portfolio',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.ico',
];

// 1. 설치 단계: 핵심 리소스 프리캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[SW] Pre-caching failed:', err);
      })
  );
});

// 2. 활성화 단계: 구버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. 네트워크 요청 인터셉트 (Stale-While-Revalidate / Cache-First 전략)
self.addEventListener('fetch', (event) => {
  // GET 요청 및 HTTP/HTTPS 프로토콜만 캐싱
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Chrome 확장 프로그램 및 API 통신 제외
  if (!url.protocol.startsWith('http')) return;
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 캐시된 버전이 있으면 먼저 반환하고, 백그라운드에서 최신 버전 fetch
      const fetchPromise = fetch(event.request)
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
          // 네트워크 실패 시 (완전 오프라인) 캐시 응답 유지
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
