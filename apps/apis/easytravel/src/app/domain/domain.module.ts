import { Module } from '@nestjs/common';
import { BookingsController } from './bookings/bookings.controller';
import { PackagesController } from './packages/packages.controller';
import {
  CreatePackageDto,
  PaginateQueryDto,
  RmqModule,
} from '@sohnandsol/shared-modules';
import {
  DESTINATIONS_SERVICE,
  PACKAGES_SERVICE,
  TOUR_OPERATORS_SERVICE,
} from '../app.constants';
import { DestinationsController } from './destinations/destinations.controller';
import { TourOperatorsController } from './tour-operators/tour-operators.controller';

@Module({
  imports: [
    RmqModule.register(PACKAGES_SERVICE),
    RmqModule.register(DESTINATIONS_SERVICE),
    RmqModule.register(TOUR_OPERATORS_SERVICE),
  ],
  controllers: [
    BookingsController,
    PackagesController,
    DestinationsController,
    TourOperatorsController,
  ],
  providers: [CreatePackageDto, PaginateQueryDto],
})
export class DomainModule {}
