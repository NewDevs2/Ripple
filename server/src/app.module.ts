import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule {}
