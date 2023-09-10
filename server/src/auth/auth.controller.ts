import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
@Controller('oauth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('kakao') // POST 요청을 받음
  async kakaoLogin(@Res() res: Response, @Req() req: Request) {
    try {
      // 클라이언트에서 보낸 코드 추출
      const { code } = req.body;

      if (code) {
        const access_token = await this.authService.processKakaoLogin(code);
        console.log(`액세스 토큰 : ${access_token}`);
        // UserService를 사용하여 UserController의 메서드 호출
        const userResult = await this.userService.callUserControllerMethod(
          access_token,
        );
        console.log(`User 컨트롤러 결과: ${userResult}`);
      }
    } catch (error) {
      console.error('에러 발생:', error);
      return res.status(500).send('서버 에러 발생');
    }
  }
}
