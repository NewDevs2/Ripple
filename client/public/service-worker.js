const CACHE_NAME = "Ripple";
const urlsToCache = ["/"];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// 푸시 알림
self.addEventListener("push", (event) => {
  const options = {
    body: "푸시 알림 테스트",
    icon: "/favicon.ico",
    // 추가적인 옵션들...
  };

  event.waitUntil(
    self.registration.showNotification("푸시 알림 제목", options)
  );
});
