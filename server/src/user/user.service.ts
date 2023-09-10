import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class UserService {
  async callUserControllerMethod(ACCESS_TOKEN: any) {
    try {
      console.log(`토큰 데이터 : ${ACCESS_TOKEN}`);
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      if (response.status === 200) {
        const userInfo = response.data;
        console.log('사용자 정보:', userInfo);
        return userInfo;
      } else {
        console.error('사용자 정보를 가져오는 데 실패했습니다.');
        return null;
      }
    } catch (error) {
      console.log(`유저 정보 받아오기 실패 : ${error}`);
    }
  }
}
