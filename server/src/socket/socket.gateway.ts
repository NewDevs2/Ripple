// socket/socket.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    console.log(`Received message from client ${client.id}: ${message}`);
    this.server.emit('message', `Server received your message: ${message}`);
  }
}
