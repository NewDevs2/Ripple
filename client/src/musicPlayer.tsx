import React from "react";
import "./App.css";

import YouTube from "react-youtube";

import { FaPlay } from "react-icons/fa";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";

const Player: React.FC = () => {
  const playlistId = "PL1Qutxw15MZxpTtg1IjV42JFa4pMjMSk5"; // 재생 목록의 ID

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      listType: "playlist",
      list: playlistId,
      playlist: playlistId,
    },
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            <code>music player</code>.
          </p>
          <YouTube opts={opts} />
          <div className="player">
            <TbPlayerSkipBackFilled />
            <FaPlay />
            <TbPlayerSkipForwardFilled />
          </div>
        </header>
      </div>
    </>
  );
};

export default Player;
