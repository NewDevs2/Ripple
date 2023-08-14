import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    users: Map<string, string>;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    handleLocation(client: any, data: string): void;
    handleVideoTitleUpdate(client: any, payload: {
        userId: string;
        title: string;
    }): void;
}
