import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { RmqServiceInterface } from '../interfaces/rmq.service.interface';

@Injectable()
export class RmqService implements RmqServiceInterface {
  private readonly logger = new Logger(RmqService.name);
  constructor(private readonly configService: ConfigService) {}

  getRmqOptions(service: string, noAck = false): RmqOptions {
    const USER = this.configService.get('RABBITMQ_USER');
    const PASSWORD = this.configService.get('RABBITMQ_PASS');
    const HOST = this.configService.get('RABBITMQ_HOST');
    const queue = this.configService.get(`RABBITMQ_${service}_QUEUE`);
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        queue,
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
