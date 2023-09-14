import { Injectable } from '@nestjs/common';
import axios from 'axios';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  async createUserInformation(user_info: any) {
    try {
      //mongoDB 연결
      mongoose.connect('mongodb://localhost/riple', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
      //인터페이스
      interface IUser extends Document {
        _id: number;
        _last_connect: string;
      }
      // 새로운 스키마 생성
      const userSchema = new mongoose.Schema<IUser>({
        _id: {
          type: Number,
          required: true,
          unique: true,
        },
        _last_connect: {
          type: String,
          required: true,
          unique: false,
        },
      });
      // 유저 모델 생성
      const User = mongoose.model<IUser>('User', userSchema);
      const userModel = mongoose.models['User'];
      // 유저 id 조회 + db에 id없으면 저장
      USER_ID_INQUIRY(user_info.id, user_info);
      async function USER_ID_INQUIRY(user_id: number, newData: Partial<IUser>) {
        const userIDCheck = await User.findById(user_id);
        if (userIDCheck) {
          userIDCheck._last_connect = newData._last_connect;
          await userIDCheck.save();
          console.log(`유저 정보 저장 ${userIDCheck}`);
        } else {
          const saveUserInfo = new userModel({
            _id: user_id,
            _last_connect: user_info.connected_at,
          });
          await saveUserInfo.save();
          console.log(`새로운 유저 db에 저장 ${saveUserInfo}`);
        }
      }
    } catch (error) {
      console.log(`DB저장 실패 : ${error}`);
    }
  }
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

        //받아온 유저 정보를 database에 저장할 콜백함수 실행
        return this.createUserInformation(userInfo);
      } else {
        console.error('사용자 정보를 가져오는 데 실패했습니다.');
        return null;
      }
    } catch (error) {
      console.log(`유저 정보 받아오기 실패 : ${error}`);
    }
  }
}
