const CACHE_NAME = "harga-toko-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/noimage.webp",
  "./assets/qr.png"
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Menghapus cache lawas:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", event => {
  if (event.request.url.includes("opensheet.elk.sh")) {
    return fetch(event.request);
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});