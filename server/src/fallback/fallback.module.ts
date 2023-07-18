import { Module } from '@nestjs/common';
import { FallbackService } from './fallback.service';
import { FallbackController } from './fallback.controller';

@Module({
  providers: [FallbackService],
  controllers: [FallbackController],
})
export class FallbackModule {}
