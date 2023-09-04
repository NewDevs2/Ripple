import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

// google.strategy.ts
async validate(
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback
): Promise<any> {
const { name, emails } = profile;
const user = {
    email: emails[0].value,
    firstName: name.givenName,
    lastName: name.familyName
};

const userFromDb = await this.authService.findOrCreateUser(user);

done(null, userFromDb);
}


  // async validate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: any,
  //   done: VerifyCallback
  // ): Promise<any> {
  //   const { name, emails, photos } = profile;
    
  //    // MongoDB에 사용자 정보 저장하는 로직 추가

  //    const user = {
  //      email: emails[0].value,
  //      firstName: name.givenName,
  //      lastName: name.familyName,
  //      pictureUrl : photos[0].value
  //      //... 나머지 필요한 데이터들
  //    };
    
  //    done(null, user);
  //  }
}
