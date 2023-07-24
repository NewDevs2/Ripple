import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as express from 'express'; // express를 가져옵니다.
import * as path from 'path';

@Module({})
export class StaticFileServeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // React 빌드된 정적 파일들의 경로를 설정합니다.
    console.log(path.join(__dirname, '..', '..', '..', 'client', 'build'))
    const buildPath = path.join(__dirname, '..', '..', '..', 'client', 'build');
    const staticPaths = ['js', 'css', 'media'];
    staticPaths.forEach((folder) => {
        const folderPath = path.join(buildPath, 'static', folder);
        consumer.apply(express.static(folderPath)).forRoutes('*');
      });
  
    consumer.apply(express.static(buildPath)).forRoutes('*'); // express.static을 사용하여 정적 파일 서빙
  }
}
