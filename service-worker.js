const CACHE_NAME = 'timer-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', function(event) {
  // Installiere den Service Worker und füge Ressourcen zum Cache hinzu
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Cache öffnen');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Bediene die Anfragen aus dem Cache oder dem Netzwerk
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Ressource ist im Cache vorhanden - gebe sie zurück
        if (response) {
          console.log('Service Worker: Ressource aus Cache abgerufen', event.request.url);
          return response;
        }

        // Ressource nicht im Cache - hole sie aus dem Netzwerk
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  // Lösche alte Caches, wenn ein neuer Service Worker aktiviert wird
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
