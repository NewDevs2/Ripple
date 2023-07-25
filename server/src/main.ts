import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // NestExpressApplication 추가
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // NestExpressApplication 사용
  app.useStaticAssets(path.join(__dirname, '..', '..', 'client', 'build'));
  console.log(path.join(__dirname, '..', '..', 'client', 'build'));

  await app.listen(3000);
}
bootstrap();
