import { Controller } from '@nestjs/common';

import { TourOperatorsService } from './services/tour-operators.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  PaginateQueryDto,
  RmqService,
  TourOperatorsEntity,
} from '@sohnandsol/shared-modules';
import { SeedService } from './services/seed.service';

@Controller()
export class TourOperatorsController {
  constructor(
    private readonly tourOperatorsService: TourOperatorsService,
    private readonly rmqService: RmqService,
    private readonly seedService: SeedService
  ) {}

  @EventPattern('seed-tour-operators')
  async seedTourOperators(@Ctx() context: RmqContext) {
    await this.seedService.seedTourOperators();
    this.rmqService.ack(context);
  }

  @MessagePattern('get-tour-operators')
  async getTourOperatirs(
    @Ctx() context: RmqContext,
    @Payload() paginateQueryDto: PaginateQueryDto
  ): Promise<[TourOperatorsEntity[], number]> {
    this.rmqService.ack(context);
    return this.tourOperatorsService.getPaginatedPackages(paginateQueryDto);
  }
}
