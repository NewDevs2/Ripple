// 리액트 라이브러리
import React, { useState, useEffect } from "react";
import "./geolocation.css";

// 컴포넌트

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
      } catch (error) {
        setUserLocation("Unable to retrieve location");
        console.error("Error retrieving location:", error);
      }
    };

    fetchLocation();
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
