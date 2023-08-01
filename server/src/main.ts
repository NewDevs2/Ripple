import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS 설정
  app.enableCors();

  // client/build 폴더 서빙
  app.useStaticAssets(join(__dirname, '../', '../', 'client', 'build'));

  await app.listen(3000);
}
bootstrap();
