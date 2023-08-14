import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class YoutubeVideoGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  @SubscribeMessage('videoTitleUpdate')
  handleVideoTitleUpdate(
    client: any,
    payload: { userId: string; title: string },
  ) {
    // 다른 사용자가 접속 시 전체에게 알림
    client.broadcast.emit('videoTitleUpdate', payload);
  }
}
