import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RmqService } from '../services/rmq.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env/.env.local',
      validationSchema: Joi.object({
        RABBITMQ_USER: Joi.string().required(),
        RABBITMQ_PASS: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
      }),
    }),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register(service: string): DynamicModule {
    const providers: Provider[] = [
      {
        provide: service,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get('RABBITMQ_USER');
          const PASSWORD = configService.get('RABBITMQ_PASS');
          const HOST = configService.get('RABBITMQ_HOST');
          const queue = configService.get(`RABBITMQ_${service}_QUEUE`);
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue,
              queueOptions: {
                durable: true, // queue survives broken restarts
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];
    return {
      module: RmqModule,
      providers,
      exports: providers,
    };
  }
}
