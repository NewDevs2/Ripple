import React, { useRef } from "react";
import "./App.css";

import YouTube from "react-youtube";

import { FaPlay } from "react-icons/fa";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";

const Player: React.FC = () => {
  const playlistId = "PL1Qutxw15MZxpTtg1IjV42JFa4pMjMSk5"; // 재생 목록의 ID
  const youtubeRef = useRef<any>(null);
  const playerStateRef = useRef<number | null>(null); // playerState를 기록할 ref

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

  // YouTube 플레이어 초기화가 완료되면 호출될 콜백 함수
  const onPlayerReady = (event: any) => {
    playerStateRef.current = event.target.getPlayerState();
  };

  const onStateChange = (event: any) => {
    if (youtubeRef.current && youtubeRef.current.internalPlayer) {
      const playerState = event.data;
      console.log(playerState);
      if (playerState === -1) {
        youtubeRef.current.internalPlayer.pauseVideo();
      } else if (playerState === 1) {
        youtubeRef.current.internalPlayer.playVideo();
      }
    }
  };

  // const handlePlayAndPause = () => {
  //   if (youtubeRef.current && youtubeRef.current.internalPlayer) {
  //     const playerState = playerStateRef.current; // playerState를 playerStateRef.current로 수정
  //     console.log(playerState);
  //     if (playerState === 1) {
  //       // 재생 중일 경우, 일시정지함
  //       youtubeRef.current.internalPlayer.pauseVideo();
  //     } else if (playerState === -1 || playerState === 3 || playerState === 5) {
  //       // 일시정지 상태이거나 동영상 종료 후 대기 상태라면 재생함
  //       youtubeRef.current.internalPlayer.playVideo();
  //     }
  //   }
  // };

  // 이전 영상으로 이동
  const handlePreviousVideo = () => {
    if (youtubeRef.current && youtubeRef.current.internalPlayer) {
      youtubeRef.current.internalPlayer.previousVideo();
    }
  };

  // 다음 영상으로 이동
  const handleNextVideo = () => {
    if (youtubeRef.current && youtubeRef.current.internalPlayer) {
      youtubeRef.current.internalPlayer.nextVideo();
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            <code>music player</code>.
          </p>
          <YouTube
            opts={opts}
            ref={youtubeRef}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
          />
          <div className="player">
            <TbPlayerSkipBackFilled onClick={handlePreviousVideo} />
            <FaPlay onClick={onStateChange} />
            <TbPlayerSkipForwardFilled onClick={handleNextVideo} />
          </div>
        </header>
      </div>
    </>
  );
};

export default Player;
