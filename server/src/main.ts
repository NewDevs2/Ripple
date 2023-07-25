import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CRA 빌드 결과물이 위치한 경로를 지정합니다.
  console.log(path.join(__dirname, '..', '..', 'client', 'build'))
  const staticFilesPath = path.join(__dirname, '..', '..', 'client', 'build');
  app.useStaticAssets(staticFilesPath);

  // '/' 요청이 왔을 때 빌드된 index.html 파일을 반환합니다.
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
  });

  await app.listen(3000);
}
bootstrap();
