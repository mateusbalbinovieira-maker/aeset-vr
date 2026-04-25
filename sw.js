var CACHE = 'aeset-vr-v2';
var FILES = [
  '/aeset-vr/',
  '/aeset-vr/index.html',
  '/aeset-vr/manifest.json',
  '/aeset-vr/icon-192.png',
  '/aeset-vr/icon-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).catch(function(){})
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).catch(function(){
        return caches.match('/aeset-vr/index.html');
      });
    })
  );
});
