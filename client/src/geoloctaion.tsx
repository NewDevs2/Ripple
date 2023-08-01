import React, { useState, useEffect } from "react";
import "./geolocation.css";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://192.168.0.215:3000";

const Geolocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);

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

    socket.on("location", (data: string[]) => {
      console.log(`${data}`);
      setLocations(data.filter((location) => location !== userLocation));
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
            <div>
              <h2>Other Users' Locations</h2>
              {locations.map((location, index) => (
                <p key={index}>{location}</p>
              ))}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Geolocation;
