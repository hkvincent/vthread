const V_THREAD = "v-thread-1.0.0";

self.addEventListener("activate", function (event) {
    console.log("ServiceWorker activated.");
});

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(V_THREAD).then(function (cache) {
            return cache.addAll([]);
        }),
    );
});

self.addEventListener("fetch", (e) => { });