import { Injectable } from '@nestjs/common';
import {
  PaginateQueryDto,
  TourOperatorsEntity,
  TourOperatorsRepository,
} from '@sohnandsol/shared-modules';

@Injectable()
export class TourOperatorsService {
  constructor(
    private readonly tourOperatorsRepository: TourOperatorsRepository,
    private readonly paginateQueryDto: PaginateQueryDto
  ) {}

  async getPaginatedPackages(
    paginateQueryDto: PaginateQueryDto
  ): Promise<[TourOperatorsEntity[], number]> {
    return await this.tourOperatorsRepository.findPaginated(paginateQueryDto, {
      relations: ['packages'],
    });
  }
}
