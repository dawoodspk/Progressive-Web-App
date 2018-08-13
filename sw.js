var cacheName = 'my-demo-app-3';
var dynamicCache = 'dynamic-cache'
var filesToCache = [
  '/javascript.js',
  '/index.html',
  '/'
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (event) {

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (cacheName.indexOf(key) === -1) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});


self.addEventListener('fetch', function (e) {
  if (e.request.url.startsWith('https://api.github.com/users')) {
    caches.open(dynamicCache).then(function (cache) {
      return fetch(e.request).then(function (res) {
        cache.put(e.request, res.clone());
        return res;
      })
    })
  }
  else {
    e.respondWith(caches.match(e.request).then(function (res) {
      return res || fetch(e.request);
    }));
  }
});