import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class YoutubeVideoGateway implements OnGatewayInit {
    server: Server;
    afterInit(server: Server): void;
    handleVideoTitleUpdate(client: any, payload: {
        userId: string;
        title: string;
    }): void;
}
