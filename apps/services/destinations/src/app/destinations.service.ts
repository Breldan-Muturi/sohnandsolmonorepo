import { Injectable } from '@nestjs/common';
import {
  DestinationsRepository,
  PaginateQueryDto,
} from '@sohnandsol/shared-modules';

@Injectable()
export class DestinationsService {
  constructor(
    private readonly paginateQueryDto: PaginateQueryDto,
    private readonly destinationRepository: DestinationsRepository
  ) {}

  async getPaginatedDestinations(paginateQueryDto: PaginateQueryDto) {
    return await this.destinationRepository.findPaginated(paginateQueryDto, {
      relations: ['packages'],
    });
  }
}
