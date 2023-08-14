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
exports.YoutubeVideoGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let YoutubeVideoGateway = exports.YoutubeVideoGateway = class YoutubeVideoGateway {
    afterInit(server) {
        console.log('WebSocket Initialized');
    }
    handleVideoTitleUpdate(client, payload) {
        client.broadcast.emit('videoTitleUpdate', payload);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], YoutubeVideoGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('videoTitleUpdate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], YoutubeVideoGateway.prototype, "handleVideoTitleUpdate", null);
exports.YoutubeVideoGateway = YoutubeVideoGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], YoutubeVideoGateway);
//# sourceMappingURL=youtube-video.gateway.js.map