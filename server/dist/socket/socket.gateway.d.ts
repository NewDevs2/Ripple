import { Server, Socket } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    handleMessage(client: Socket, message: string): void;
}
