// 서버 측 코드 (SocketGateway)
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string) {
    console.log('Received message:', payload);
    this.server.emit('message', payload); // 클라이언트로 메시지 보내기
  }
}
