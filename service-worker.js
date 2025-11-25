const CACHE_NAME = "brilliant-event-v1";

const assetsToCache = [
  "index.html",
  "pdf.html",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "manifest.json",
  "a.jpg",
  "styles.css",
  "script.js"
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Serve cached files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("index.html") // Offline fallback
        )
      );
    })
  );
});

// Update cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});
