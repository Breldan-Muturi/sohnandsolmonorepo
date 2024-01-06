import { Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { TOUR_OPERATORS_SERVICE } from '../../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { PaginateQueryDto } from '@sohnandsol/shared-modules';

@Controller('tour-operators')
export class TourOperatorsController {
  constructor(
    @Inject(TOUR_OPERATORS_SERVICE)
    private readonly tourOperatorsService: ClientProxy
  ) {}

  @Post('seed')
  seedTourOperators() {
    return this.tourOperatorsService.send('seed-tour-operators', {});
  }

  @Get()
  getTourOperators(@Query() paginateQueryDto: PaginateQueryDto) {
    return this.tourOperatorsService.send(
      'get-tour-operators',
      paginateQueryDto
    );
  }
}
