import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModule } from './page/page.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }), AuthModule,PageModule],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule { }
