<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
=======
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { Express as expressMiddleware } from 'express';
import * as path from 'path';
// import { StaticFileServeModule } from './static-file-serve/static-file-serve.module';
import { SocketModule } from './socket/socket.module';
import { PageModule } from './page/page.module';
@Module({
  imports: [SocketModule, PageModule],
  controllers: [],
  providers: [],
>>>>>>> kwon5-1
})
export class AppModule {}
