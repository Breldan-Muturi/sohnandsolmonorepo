import { Controller } from '@nestjs/common';
import { OrganizationService } from './org.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@sohnandsol/shared-modules';

@Controller()
export class OrganizationController {
  constructor(
    private readonly orgService: OrganizationService,
    private readonly rmqService: RmqService
  ) {}

  @MessagePattern('get_user_organization')
  async getUserOrganization(
    @Payload() userId: string,
    @Ctx() context: RmqContext
  ) {
    const organizationId = this.orgService.getUserOrganization(userId);
    this.rmqService.ack(context); // Acknowledge the message after processing.
    return organizationId; // Return the organizationId which will be sent back through RabbitMQ
  }
}
