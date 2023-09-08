import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import KakaoCallback from "./callback/kakao";
import Geolocation from "./geoloctaion";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Player from "./youtubeMusicPlayer";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/player" element={<Player />} />
        <Route path="/oauth/kakao" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

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

reportWebVitals();
