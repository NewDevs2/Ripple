import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('oauth')
export class AuthController {
  @Post('kakao') // POST 요청을 받음
  async kakaoLogin(@Res() res: Response, @Req() req: Request) {
    try {
      // 클라이언트에서 보낸 코드 추출
      const { code } = req.body;

      if (code) {
        // 필요한 작업을 수행합니다.
        console.log('인가 코드:', code);

        // 예: 서버로 code를 전송하여 액세스 토큰을 요청하거나 추가 작업을 수행합니다.
        return res.send('요청왔습니다.');
      } else {
        console.log('요청에 인가 코드가 없습니다.');
        return res.status(400).send('인가 코드가 없습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      return res.status(500).send('서버 에러 발생');
    }
  }
}
