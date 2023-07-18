import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackModule } from './fallback/fallback.module';

@Module({
  imports: [FallbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
