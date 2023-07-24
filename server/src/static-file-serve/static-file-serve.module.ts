import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as express from 'express'; // express를 가져옵니다.
import * as path from 'path';

@Module({})
export class StaticFileServeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log(__dirname);
    // React 빌드된 정적 파일들의 경로를 설정합니다.
    const staticPath = path.join(__dirname, '..', '..','client', 'public');
    consumer.apply(express.static(staticPath)).forRoutes('*'); // express.static을 사용하여 정적 파일 서빙
  }
}
