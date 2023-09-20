// 리액트 라이브러리
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoginCatch from './loginCatch';
// 컴포넌트
import "./App.css";
import Kakao from './kakaoLogin';
import logo from "./logo.svg";
async function requestNotificationPermission() {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("알림 권한이 요청이 거부되었습니다.");
    }
  }
}

const App: React.FC = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  function handleNotificationClick() {
    // 알림이 클릭되었을 때 수행할 동작을 여기서 작성한다.
    console.log("알림을 클릭했습니다.");
  }

  function sendNotification() {
    if ("Notification" in window && Notification.permission === "granted") {
      setTimeout(() => {
        const notification = new Notification("Ripple", {
          body: "누군가 회원님의 트랙을 좋아합니다.",
          icon: "/favicon.ico", // 알림 아이콘 경로를 지정.
        });
        notification.addEventListener("click", handleNotificationClick);
      }, 3000);
    } else {
      console.log("알림 권한이 없습니다. 알림을 허용해주세요.");
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>Ripple</code>.<br></br>
            <button onClick={sendNotification}>푸시 알림 전송</button>
            <Link to={"/geolocation"}>
              <button>리플기능</button>
            </Link>
            <Link to="/player">
              <button>음악기능</button>
            </Link>
            <Kakao />
            <LoginCatch />
          </p>
        </header>
      </div>
    </>
  );
};

export default App;
