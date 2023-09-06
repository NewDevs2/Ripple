import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('/kakao') // '/auth/kakao'를 'kakao'로 변경
  async kakaoLogin(@Res() res: Response, @Req() req: Request) {
    // 카카오 인증 요청
    return res.redirect('/');
  }
}
