import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('kakao') // '/auth/kakao'를 'kakao'로 변경
  kakaoAuth(@Res() res: Response) {
    console.log('유저가 카카오 로그인 요청');
    res.send('하이');
  }
}
