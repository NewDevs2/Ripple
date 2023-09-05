import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('kakao') // '/auth/kakao'를 'kakao'로 변경
  async kakaoLogin(@Res() res: Response, @Req() req: Request) {
    // 카카오 인증 요청
    const path = `https://kauth.kakao.com/oauth/authorize?client_id=9da388ef82d7b351156a7e2e0772c757&redirect_uri=http://localhost:3000/auth/kakao&response_type=code`;
    return res.redirect(path);
  }
}
