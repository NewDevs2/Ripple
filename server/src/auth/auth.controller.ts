import { Controller, Post, Req, Res } from '@nestjs/common';
import axios from 'axios';
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
        axios
          .post('https://kauth.kakao.com/oauth/token', null, {
            params: {
              grant_type: 'authorization_code',
              client_id: 'e13169ec36f699296518921c6bd1fbd7',
              redirect_uri: 'http://localhost:3000/oauth/kakao',
              code: code,
            },
          })
          .then((response) => {
            console.log(
              `카카오에서 받아온 데이터 : ${response.data.access_token}`,
            );
          })
          .catch((error) => {
            console.log(error);
          });

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
