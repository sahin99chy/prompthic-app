// Service Worker for Prompthic PWA
const CACHE_NAME = 'prompthic-cache-v1';
const urlsToCache = [
  '/prompthic-app/',
  '/prompthic-app/index.html',
  '/prompthic-app/favicon.svg',
  '/prompthic-app/manifest.json',
  '/prompthic-app/assets/index-DZ0BHRPM.js',
  '/prompthic-app/assets/index-CaslLlTK.css'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
}); 