self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('smartpark-static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.tsx',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => {
      if (!k.startsWith('smartpark-static-')) {
        return caches.delete(k);
      }
    })))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        const copy = networkResponse.clone();
        caches.open('smartpark-static-v1').then((cache) => cache.put(request, copy));
        return networkResponse;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});


