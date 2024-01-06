import { Module } from '@nestjs/common';

import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import {
  DestinationEntity,
  DestinationsRepository,
  PackageEntity,
  PackagesRepository,
  PaginateQueryDto,
  PostgresDBModule,
  ReviewEntity,
  RmqModule,
  TourOperatorsEntity,
  UserEntity,
} from '@sohnandsol/shared-modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.env.local',
      validationSchema: Joi.object({
        RABBITMQ_DESTINATIONS_QUEUE: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    RmqModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([
      PackageEntity,
      DestinationEntity,
      ReviewEntity,
      UserEntity,
      TourOperatorsEntity,
    ]),
  ],
  controllers: [DestinationsController],
  providers: [
    DestinationsService,
    PaginateQueryDto,
    DestinationsRepository,
    PackagesRepository,
  ],
})
export class DestinationsModule {}
