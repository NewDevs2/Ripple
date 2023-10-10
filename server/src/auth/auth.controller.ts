import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('kakao')
  async kakaoLogin(@Res() res: Response, @Req() req: Request) {
    try {
      // 클라이언트에서 보낸 코드 추출
      const { code } = req.body;

      if (code) {
        const access_token = await this.authService.processKakaoLogin(code);
        console.log(`액세스 토큰 : ${access_token}`);
        // access토큰으로 유저 정보를 요청하는 콜백 함수 실행
        const userResult = await this.userService.callUserControllerMethod(
          access_token,
        );
        console.log(`User 컨트롤러 결과: ${userResult}`);
        // true가 반환되면 유저 정보 성공적으로 받아온 것
        if (userResult.access === true) {
          console.log(userResult);
          // access Token
          try {
            const access_token = jwt.sign(
              {
                id: userResult.information.id,
                last_connect: userResult.information.connected_at,
                profile_image: userResult.information.properties.profile_image,
              },
              // 시크릿 키
              process.env.ACCESS_SECRET,
              // 유효 시간, 발급자
              { expiresIn: '1m', issuer: 'Rubin' },
            );
            // refresh Token
            const refresh_token = jwt.sign(
              {
                id: userResult.information.id,
                last_connect: userResult.information.connected_at,
                profile_image: userResult.information.properties.profile_image,
              },
              process.env.ACCESS_SECRET,
              {
                expiresIn: '24h',
                issuer: 'Rubin',
              },
            );
            res.cookie('KAKAO_ACCESS_TOKEN', access_token, {
              // loacl서버가 현재 http므로 false로 설정
              secure: false,
              httpOnly: true,
            });
            res.cookie('KAKAO_REFRESH_TOKEN', refresh_token, {
              secure: false,
              httpOnly: true,
            });
            // 유저 정보, 로그인 상태 관리에 사용할 데이터 전송
            res.status(200).send({
              loginState: true,
              userInformation: userResult.information,
            });
          } catch (error) {
            res.status(500).json(error);
          }
        } else if (userResult.access === false) {
          console.log(
            'DB에 유저 데이터 저장 혹은, 카카오 유저 정보 조회에서 문제가 생겼습니다.',
          );
        } else {
          console.log('뭔가 다른 문제가 생긴 것 같습니다. 확인 필요');
        }
      }
    } catch (error) {
      console.error('에러 발생:', error);
      return res.status(500).send('서버 에러 발생');
    }
  }
}
