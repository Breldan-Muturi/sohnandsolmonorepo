import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DestinationsModule } from './app/destinations.module';
import { RmqService } from '@sohnandsol/shared-modules';

async function bootstrap() {
  const app = await NestFactory.create(DestinationsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getRmqOptions('DESTINATIONS'));
  await app.startAllMicroservices();
  Logger.log(`🚀 Destinations Microservice is running`);
}

bootstrap();
