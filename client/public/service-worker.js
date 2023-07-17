self.addEventListener("push", (event) => {
  const options: NotificationOptions = {
    body: "푸시 알림 테스트",
    icon: "/favicon.ico",
  };

  event.waitUntil(
    self.registration.showNotification("푸시 알림 테스트", options)
  );
});
