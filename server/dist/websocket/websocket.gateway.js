"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WebsocketGateway = exports.WebsocketGateway = class WebsocketGateway {
    constructor() {
        this.users = new Map();
    }
    handleConnection(client, ...args) {
        console.log('새로운 클라이언트 연결됨 : ', client.id);
        client.emit('location', Array.from(this.users.values()));
    }
    handleDisconnect(client) {
        console.log('클라이언트 연결 끊김 : ', client.id);
        this.users.delete(client.id);
        this.server.emit('location', Array.from(this.users.values()));
    }
    handleLocation(client, data) {
        const userLocationString = `${data}`;
        this.users.set(client.id, userLocationString);
        this.server.emit('location', Array.from(this.users.values()));
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('location'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleLocation", null);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ port: 5001 })
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map