import React, { useEffect, useRef } from "react";
import "./App.css";

interface YoutubePlayerProps {
  videoId: string;
  onReady?: () => void;
  onStateChange?: (event: YT.OnStateChangeEvent) => void;
}

const Player: React.FC<YoutubePlayerProps> = ({
  videoId,
  onReady,
  onStateChange,
}) => {
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId,
        events: {
          onReady: () => {
            if (onReady) {
              onReady();
            }
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (onStateChange) {
              onStateChange(event);
            }
          },
        },
      });
    };
    // 스크립트가 로드되면 onYouTubeIframeAPIReady 함수를 호출하도록 설정
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // 컴포넌트가 언마운트 될 때 스크립트 이벤트 리스너를 정리
    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId, onReady, onStateChange]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>
            <code>music player</code>.
          </p>
          <div id="youtube-player"></div>
        </header>
      </div>
    </>
  );
};

export default Player;
