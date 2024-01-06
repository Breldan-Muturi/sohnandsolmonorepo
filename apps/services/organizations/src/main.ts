import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OrganizationModule } from './org.module';
import { RmqService } from '@sohnandsol/shared-modules';

async function bootstrap() {
  const app = await NestFactory.create(OrganizationModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getRmqOptions('ORGANIZATIONS'));
  await app.startAllMicroservices();
  Logger.log(`🚀 Organization service is running`);
}

bootstrap();
