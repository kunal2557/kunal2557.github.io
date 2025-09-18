self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('smartpark-static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => Promise.all(keys.map((k) => {
        if (!k.startsWith('smartpark-static-')) {
          return caches.delete(k);
        }
      }))),
      self.clients.claim()
    ])
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        try {
          const copy = networkResponse.clone();
          caches.open('smartpark-static-v1').then((cache) => cache.put(request, copy));
        } catch {}
        return networkResponse;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});


