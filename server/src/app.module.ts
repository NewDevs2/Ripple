import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { Express as expressMiddleware } from 'express';
import * as path from 'path';
import { StaticFileServeModule } from './static-file-serve/static-file-serve.module';
import { SocketGateway } from './socket/socket.gateway';
@Module({
  imports: [StaticFileServeModule],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
