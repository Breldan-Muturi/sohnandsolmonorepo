import { Module } from '@nestjs/common';
import { TourOperatorsController } from './tour-operators.controller';
import { TourOperatorsService } from './services/tour-operators.service';
import {
  DestinationEntity,
  PackageEntity,
  PackagesRepository,
  PaginateQueryDto,
  PostgresDBModule,
  ReviewEntity,
  ReviewsRepository,
  RmqModule,
  TourOperatorsEntity,
  TourOperatorsRepository,
  UserEntity,
} from '@sohnandsol/shared-modules';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './services/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env/.env.local',
      validationSchema: Joi.object({
        RABBITMQ_TOUROPERATORS_QUEUE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forFeature([
      TourOperatorsEntity,
      ReviewEntity,
      PackageEntity,
      DestinationEntity,
      UserEntity,
    ]),
    RmqModule,
    PostgresDBModule,
  ],
  controllers: [TourOperatorsController],
  providers: [
    SeedService,
    TourOperatorsService,
    TourOperatorsRepository,
    PackagesRepository,
    ReviewsRepository,
    PaginateQueryDto,
  ],
})
export class TourOperatorsModule {}
