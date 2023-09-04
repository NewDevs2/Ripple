import { Controller , Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

 @Get('google')
 @UseGuards(AuthGuard('google'))
 googleLogin() {}

 @Get('google/callback')
 @UseGuards(AuthGuard('google'))
 googleLoginCallback(@Req() req) {
   // 구글 로그인 후 동작할 코드 작성 (예시 : JWT 발급)
 }

}
