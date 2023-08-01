import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('localhost.key'),
      cert: fs.readFileSync('localhost.crt'),
    },
  });

  // CORS 설정
  app.enableCors();

  // client/build 폴더 서빙
  app.useStaticAssets(join(__dirname, '../', '../', 'client', 'build'));

  await app.listen(3000);
}
bootstrap();
