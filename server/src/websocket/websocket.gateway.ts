import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ port: 5001 })
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  users = new Map<string, string>();

  handleConnection(client: any, ...args: any[]) {
    console.log('새로운 클라이언트 연결됨 : ', client.id);
    client.emit('location', Array.from(this.users.values()));
  }

  handleDisconnect(client: any) {
    console.log('클라이언트 연결 끊김 : ', client.id);
    this.users.delete(client.id);
    this.server.emit('location', Array.from(this.users.values()));
  }

  @SubscribeMessage('location')
  handleLocation(client: any, data: string) {
    const userLocationString = `${data}`;
    this.users.set(client.id, userLocationString);
    this.server.emit('location', Array.from(this.users.values()));
  }

  @SubscribeMessage('videoTitleUpdate')
  handleVideoTitleUpdate(
    client: any,
    payload: { userId: string; title: string },
  ) {
    console.log(payload);
    // 사용자가 재생 중인 영상의 제목을 저장하고 전송
    this.users.set(payload.userId, payload.title);
    this.server.emit('videoTitleUpdate', Array.from(this.users.values()));
  }
}
