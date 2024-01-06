import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrganizationController } from './org.controller';
import { OrganizationService } from './org.service';
import Joi from 'joi';
import { RmqModule } from '@sohnandsol/shared-modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.env.local',
      validationSchema: Joi.object({
        TABLE_NAME: Joi.string().required(),
        REGION: Joi.string().required(),
        RABBITMQ_ORGANIZATIONS_QUEUE: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    RmqModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
