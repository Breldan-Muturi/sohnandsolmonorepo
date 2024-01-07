import { Injectable } from '@nestjs/common';
import {
  DestinationsRepository,
  PaginateQueryDto,
  ReadDestinationsDto,
} from '@sohnandsol/shared-modules';

@Injectable()
export class DestinationsService {
  constructor(
    private readonly paginateQueryDto: PaginateQueryDto,
    private readonly destinationRepository: DestinationsRepository
  ) {}

  async getPaginatedDestinations(
    paginateQueryDto: PaginateQueryDto
  ): Promise<ReadDestinationsDto[]> {
    return await this.destinationRepository.findDestinationWithManyPackages(
      paginateQueryDto
    );
  }
}
