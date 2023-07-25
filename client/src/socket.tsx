// src/App.js
import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const SocketTest = ():JSX.Element => {
    const socket = socketIOClient('http://localhost:3000');

    // 서버로 메시지를 보내는 이벤트 핸들러
    const sendMessageToServer = () => {
      socket.emit('message', '안녕');
    };

    // 서버로부터 메시지를 받는 이벤트 핸들러 등록
    socket.on('message', (data) => {
      console.log('Received message from server:', data);
    });


  return (
    <div>
      <button onClick={sendMessageToServer}>메시지 보내기</button>
    </div>
  );
}

export default SocketTest;
