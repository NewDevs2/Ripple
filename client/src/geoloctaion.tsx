// 리액트 라이브러리
import React, { useState, useEffect } from "react";
import "./geolocation.css";

// 외부 라이브러리
import socketIOClient from "socket.io-client";

// 컴포넌트

// 웹소켓 서버
const ENDPOINT = "https://localhost:3000"; // nest.js 서버 주소

const Geolocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    const getCurrentLocation = (): Promise<GeolocationPosition> =>
      new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation을 지원하지 않습니다."));
        }

        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      });

    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        setUserLocation(`Latitude : ${latitude}, Longitude : ${longitude}`);
        const userLocationString = `Latitude : ${latitude}, Longitude : ${longitude}`;
        socket.emit("location", userLocationString);
      } catch (error) {
        setUserLocation("위치를 가져올 수 없습니다.");
        console.error("위치를 가져오는데 실패했습니다 : ", error);
      }
    };
    fetchLocation();

    socket.on("location", (data: string) => {
      console.log(`사용자의 위치 정보 : ${data}`);
    });

    const disconnectSocket = () => {
      socket.disconnect();
    };

    return disconnectSocket;
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div>
            <h1>User Location</h1>
            {userLocation ? <p>{userLocation}</p> : <p>Loading...</p>}
          </div>
        </header>
      </div>
    </>
  );
};

export default Geolocation;
