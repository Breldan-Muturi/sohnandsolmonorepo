import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // Remeber to update this in production.
    origin: '*',
  });
  const port = process.env.API_AUTH;
  await app.listen(port);
  Logger.log(`🚀 Auth Api Gateway is running on: http://localhost:${port}`);
}

bootstrap();
