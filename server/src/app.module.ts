import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AccesstokenController } from './accesstoken/accesstoken.controller';
import { AccesstokenService } from './accesstoken/accesstoken.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController, UserController, AccesstokenController],
  providers: [AppService, WebsocketGateway, UserService, AccesstokenService],
})
export class AppModule {}
