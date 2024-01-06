import { Controller } from '@nestjs/common';

import { DestinationsService } from './destinations.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaginateQueryDto, RmqService } from '@sohnandsol/shared-modules';

@Controller()
export class DestinationsController {
  constructor(
    private readonly destinationsService: DestinationsService,
    private readonly rmqService: RmqService
  ) {}

  @MessagePattern('get-paginated-destinations')
  async getPaginatedDestinations(
    @Ctx() context: RmqContext,
    @Payload() paginateQueryDto: PaginateQueryDto
  ) {
    this.rmqService.ack(context);
    return this.destinationsService.getPaginatedDestinations(paginateQueryDto);
  }
}
