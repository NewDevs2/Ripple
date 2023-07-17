import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { send } from "process";


const sendNotification = () => {
  // Push Notification을 보내는 로직을 구현합니다.
  // Service Worker 등록과 관련된 코드가 여기 들어갑니다.
  if ("serviceWorker" in navigator && "PushManager" in window) {
    // Service Worker 등록
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered!");

        // 푸시 알림 구독 요청
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: "YOUR_PUBLIC_VAPID_KEY",
          })
          .then((subscription) => {
            console.log("Push notification subscribed:", subscription);
          })
          .catch((error) => {
            console.error("Error subscribing to push notification:", error);
          });
      })
      .catch((error) => {
        console.error("Error registering Service Worker:", error);
      });
  }
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Ripple</code>.<button onClick={sendNotification}>푸시 알람 보내깅ㅎ</button>
        </p>
      </header>
    </div>
  );
};

export default App;
