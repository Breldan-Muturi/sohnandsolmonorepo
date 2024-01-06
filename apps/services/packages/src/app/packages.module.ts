import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './services/packages.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import {
  AddDestinationDto,
  CreatePackageDto,
  PackageEntity,
  PackagesRepository,
  PaginateQueryDto,
  PostgresDBModule,
  ReviewEntity,
  RmqModule,
  UserEntity,
  DestinationsRepository,
  DestinationEntity,
  TourOperatorsEntity,
} from '@sohnandsol/shared-modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './services/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.env.local',
      validationSchema: Joi.object({
        RABBITMQ_PACKAGES_QUEUE: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    RmqModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([
      PackageEntity,
      ReviewEntity,
      UserEntity,
      DestinationEntity,
      TourOperatorsEntity,
    ]),
  ],
  controllers: [PackagesController],
  providers: [
    PackagesService,
    SeedService,
    PackagesRepository,
    DestinationsRepository,
    DestinationsRepository,
    CreatePackageDto,
    PaginateQueryDto,
    AddDestinationDto,
  ],
})
export class PackagesModule {}
