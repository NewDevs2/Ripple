import React, { useRef, useState, useEffect } from "react";
import "./App.css";

import YouTube from "react-youtube";

import { FaPlay, FaPause } from "react-icons/fa";
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
} from "react-icons/tb";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

const Player: React.FC = () => {
  const playlistId = "PL1Qutxw15MZxpTtg1IjV42JFa4pMjMSk5"; // 재생 목록의 ID
  const youtubeRef = useRef<any>(null);
  const playerStateRef = useRef<number | null>(null); // playerState를 기록할 ref
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>("");
  const [userVideoTitle, setUserVideoTitle] = useState<string>("");
  const socket = socketIOClient(ENDPOINT);
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

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    socket.on("videoTitleUpdate", (titles: string[]) => {
      setUserVideoTitle(titles[0]);
    });
  }, []); // 빈 의존성 배열로 한 번만 실행

  const PLAYER_STATE = {
    UNSTARTED: -1,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    // ... 기타 상태 값 정의
  };

  // YouTube 플레이어 초기화가 완료되면 호출될 콜백 함수
  const onPlayerReady = (event: any) => {
    playerStateRef.current = event.target.getPlayerState();
    setCurrentVideoTitle(event.target.getVideoData().title);
  };
  const onStateChange = (event: any) => {
    if (youtubeRef.current && youtubeRef.current.internalPlayer) {
      const playerState = event.data;
      playerStateRef.current = playerState; // 상태를 playerStateRef에 저장

      // 영상이 바뀔 때마다 정보를 업데이트함
      setCurrentVideoTitle(event.target.getVideoData().title);

      const updateVideoTitle = (userId: any, title: any) => {
        socket.emit("videoTitleUpdate", { userId, title });
      };

      const title = event.target.getVideoData().title;
      updateVideoTitle("user123", title);
      switch (playerState) {
        case PLAYER_STATE.UNSTARTED:
          youtubeRef.current.internalPlayer.pauseVideo();
          break;
        case PLAYER_STATE.PLAYING:
          youtubeRef.current.internalPlayer.playVideo();
          break;
      }
    }
  };

  const handlePlayAndPause = () => {
    if (youtubeRef.current && youtubeRef.current.internalPlayer) {
      const playerState = playerStateRef.current;
      console.log(playerState);
      switch (playerState) {
        case PLAYER_STATE.UNSTARTED: // 시작되지 않은 상태일 때
          youtubeRef.current.internalPlayer.playVideo();
          break;
        case PLAYER_STATE.PAUSED: // 일시정지 상태일 때
          youtubeRef.current.internalPlayer.playVideo();
          break;
        case PLAYER_STATE.PLAYING: // 재생 상태일 때
          youtubeRef.current.internalPlayer.pauseVideo();
          break;
      }
    }
  };

  // 이전 영상으로 이동
  const handlePreviousVideo = (event: any) => {
    if (youtubeRef.current && youtubeRef.current.internalPlayer) {
      youtubeRef.current.internalPlayer.previousVideo();
    }
  };

  // 다음 영상으로 이동
  const handleNextVideo = (event: any) => {
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
            {playerStateRef.current === PLAYER_STATE.PLAYING ? (
              <FaPause onClick={handlePlayAndPause} />
            ) : (
              <FaPlay onClick={handlePlayAndPause} />
            )}
            <TbPlayerSkipForwardFilled onClick={handleNextVideo} />
          </div>
          <p>{currentVideoTitle}</p>
          <p>{userVideoTitle}</p>
        </header>
      </div>
    </>
  );
};

export default Player;
