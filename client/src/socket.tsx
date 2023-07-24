import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000';

function WebSocket() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    // 서버로부터 메시지를 받는 이벤트 핸들러 등록
    socket.on('message', (data) => {
      console.log('Received message from server:', data);
    });

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
        소켓 모듈
    </div>
  );
}

export default WebSocket;
