import { Controller, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('kakao') // POST 요청을 받음
  async kakaoLogin(@Res() res: Response, @Req() req: Request) {
    try {
      // 클라이언트에서 보낸 코드 추출
      const { code } = req.body;

      if (code) {
        const access_token = await this.authService.processKakaoLogin(code);
        console.log(`액세스 토큰 : ${access_token}`);
      }
    } catch (error) {
      console.error('에러 발생:', error);
      return res.status(500).send('서버 에러 발생');
    }
  }
}
