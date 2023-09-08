import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
            client_id: 'e13169ec36f699296518921c6bd1fbd7',
            redirect_uri: 'http://localhost:3000/oauth/kakao',
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
