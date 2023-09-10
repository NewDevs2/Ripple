import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService {
  async processKakaoLogin(code: any) {
    try {
      console.log(`코드 데이터 : ${code}`);
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: `${process.env.kakao_client_id}`,
            redirect_uri: `${process.env.kako_redirect_uri}`,
            code: code,
          },
        },
      );
      const access_token = response.data.access_token;
      return access_token;
    } catch (error) {
      console.log('액세스 토큰 요청 실패 :', error);
    }
  }
}
