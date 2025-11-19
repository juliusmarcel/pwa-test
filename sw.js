// self.addEventListener("install", (e) => {
//     console.log("Service Worker Installed");
//     self.skipWaiting();
// });

// self.addEventListener("activate", (e) => {
//     console.log("Service Worker Activated");
// });


const CACHE_NAME = 'pqs-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
