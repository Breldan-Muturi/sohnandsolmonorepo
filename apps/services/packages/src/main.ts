import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PackagesModule } from './app/packages.module';
import { RmqService } from '@sohnandsol/shared-modules';

async function bootstrap() {
  const app = await NestFactory.create(PackagesModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getRmqOptions('PACKAGES'));
  await app.startAllMicroservices();
  Logger.log(`🚀 Packages service is running`);
}

bootstrap();
