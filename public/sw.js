self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('titanium-v1').then(cache => cache.addAll(['/', '/dashboard', '/library'])));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
