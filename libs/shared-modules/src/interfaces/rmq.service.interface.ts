import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface RmqServiceInterface {
  getRmqOptions(queue: string, noAck?: boolean): RmqOptions;
  ack(context: RmqContext): void;
}
