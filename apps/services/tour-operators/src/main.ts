import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TourOperatorsModule } from './app/tour-operators.module';
import { RmqService } from '@sohnandsol/shared-modules';

async function bootstrap() {
  const app = await NestFactory.create(TourOperatorsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getRmqOptions('TOUROPERATORS'));
  await app.startAllMicroservices();
  Logger.log(`🚀 Tour operators Microservice is running`);
}

bootstrap();
