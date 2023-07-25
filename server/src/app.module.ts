import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { Express as expressMiddleware } from 'express';
import * as path from 'path';
// import { StaticFileServeModule } from './static-file-serve/static-file-serve.module';
import { SocketModule } from './socket/socket.module';
@Module({
  imports: [SocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
