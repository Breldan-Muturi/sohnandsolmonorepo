import { Controller, Get, Inject, Query } from '@nestjs/common';
import { DESTINATIONS_SERVICE } from '../../app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { PaginateQueryDto } from '@sohnandsol/shared-modules';

@Controller('destinations')
export class DestinationsController {
  constructor(
    @Inject(DESTINATIONS_SERVICE)
    private readonly destinationsService: ClientProxy
  ) {}

  @Get()
  getPaginatedPackages(@Query() paginateQueryDto: PaginateQueryDto) {
    return this.destinationsService.send(
      'get-paginated-destinations',
      paginateQueryDto
    );
  }
}
