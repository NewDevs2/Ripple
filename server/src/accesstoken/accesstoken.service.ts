import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
@Injectable()
export class AccesstokenService {
  async verifyAccessToken(access_token: any) {
    try {
      // 몽고 db 연결
      mongoose.connect('mongodb://localhost/riple', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      // accesstoken 파싱
      // const collection = db.collection('users');
      return 'hi';
    } catch (error) {
      console.log(`액세스 토큰 가져오기 실패 ${error}`);
    }
  }
}
