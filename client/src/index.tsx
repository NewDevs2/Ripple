import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

// 파이어베이스 추가
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgzJiuuT5_cYqMnbed8Hknuq8Wnpl0RxI",
  authDomain: "rippletest-c2e34.firebaseapp.com",
  projectId: "rippletest-c2e34",
  storageBucket: "rippletest-c2e34.appspot.com",
  messagingSenderId: "244048560120",
  appId: "1:244048560120:web:a74444b9ec3e9326caa00d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
getToken(messaging, {
  vapidKey:
    "BFo-kCR5AXHVPGdq92pZ-tmhraepYAXPXlm0FN-Nd2UE7Ws7MoEnfF_4d6JpbixW7lGhde5Vq6raG_PWrCrhpJM",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("FCM 토큰 : ", currentToken);
      // 서버로 토큰을 전송하여 특정 사용자에게 푸시 알림을 보낼 수 있음
    } else {
      console.log("FCM 토큰을 가져오는데 실패함");
    }
  })
  .catch((error) => {
    console.error("FCM 토큰 요청 오류 : ", error);
  });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(
      function (registration) {
        console.log("Service Worker 등록 성공:", registration.scope);
      },
      function (error) {
        console.log("Service Worker 등록 실패:", error);
      }
    );
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
