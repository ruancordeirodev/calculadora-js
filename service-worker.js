const CACHE_NAME = "calc-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./js/calculator.js",
  "./js/history.js",
  "./js/ui.js",
  "./js/events.js",
  "./js/main.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});