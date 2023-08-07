import React, { useEffect, useRef } from "react";
import "./App.css";

import YouTube from "react-youtube";

const Player: React.FC = () => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            <code>music player</code>.
          </p>
          <YouTube
            id="youtube-player"
            className="player"
            style={{ width: "100%", height: "100%" }}
            videoId={"aUndbCBVV0c"}
            opts={opts}
          />
        </header>
      </div>
    </>
  );
};

export default Player;
