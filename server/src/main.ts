import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'client', 'build'));
  // CORS 미들웨어 추가 및 세부 설정
  app.enableCors({
    origin: 'https://localhost:3000/', // 특정 도메인만 허용 (실제 도메인으로 변경해야 함)
    allowedHeaders: 'Content-Type, Accept', // 허용할 헤더 지정
    methods: 'GET, POST', // 허용할 HTTP 메서드 지정
  });

  await app.listen(3000);
}
bootstrap();
