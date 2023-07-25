import { Controller, Get,Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';

@Controller()
export class PageController {
  @Get('*')
  serveFile(@Req() req: Request, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'client', 'build');
    return res.sendFile(filePath);
  }
}