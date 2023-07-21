// 리액트 라이브러리
import React from "react";
import "./geolocation.css";

// 컴포넌트

const Geolocation: React.FC = () => {
  navigator.geolocation;
  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="userPosition"></div>
        </header>
      </div>
    </>
  );
};

export default Geolocation;
