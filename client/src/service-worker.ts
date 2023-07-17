self.addEventListener("push", (event:PushEvent) => {
  const options:NotificationOptions = {
    body: "푸시 알림 테스트",
    icon: "/public/favicon.ico",
  };

  event.waitUntil(
    self.registration.showNotification("푸시 알림 테스트", options)
  );
});
