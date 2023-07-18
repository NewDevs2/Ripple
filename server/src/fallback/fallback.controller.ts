import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { FallbackService } from './fallback.service';

@Controller('fallback')
export class FallbackController {
  constructor(private readonly FallbackService: FallbackService) {}
  @Get('*')
  failback(@Res() res: Response) {
    res.sendFile(this.FallbackService.getBuildPath());
  }
}
