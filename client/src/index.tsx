import React from "react";
import { CookiesProvider } from 'react-cookie';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import KakaoCallback from "./callback/kakao";
import Geolocation from "./geoloctaion";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Player from "./youtubeMusicPlayer";
// 로그인 상태 관리 모듈과 패키지
import { loginState } from "./auth/loginState";
import {RecoilRoot} from 'recoil';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* recoil 전역 관리 범위 */}
    <RecoilRoot >
    {/* 쿠키 제공 범위 */}
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/player" element={<Player />} />
        <Route path="/oauth/kakao" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
    </RecoilRoot>
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
