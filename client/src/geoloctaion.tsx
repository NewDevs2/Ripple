// 리액트 라이브러리
import React, { useState, useEffect } from "react";
import "./geolocation.css";

// 컴포넌트

// 웹소켓 서버
const ws = new WebSocket("ws://localhost:5001"); // 웹 소켓 서버 주소

const Geolocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const getCurrentLocation = (): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not available"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        setUserLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
        const userLocationString = `Latitude: ${latitude}, Longitude: ${longitude}`;

        ws.send(userLocationString);
      } catch (error) {
        setUserLocation("Unable to retrieve location");
        console.error("Error retrieving location:", error);
      }
    };

    fetchLocation();

    ws.onmessage = (event) => {
      const receivedLocation = event.data;
      console.log(`사용자의 위치 정보 : ${receivedLocation}`);
    };
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
