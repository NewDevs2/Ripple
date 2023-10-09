import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AccesstokenService } from './accesstoken.service';
@Controller('accesstoken')
export class AccesstokenController {
  constructor(private readonly accesstokenService: AccesstokenService) {}
  @Get('kakao')
  getAccessToken(@Req() request: Request) {
    const cookieData = request.cookies.access_token;
    // 요청으로 넘어온 access token으로 토큰 검증
    return this.accesstokenService.verifyAccessToken(cookieData);
  }
}
