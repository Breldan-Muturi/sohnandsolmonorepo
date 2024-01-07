import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { DestinationsRepositoryInterface } from '../interfaces/destinations.repository.interface';
import { DestinationEntity } from '../entities/destination.entity';
import { PaginateQueryDto } from '../dto/pagination.query.dto';
import { ReadDestinationsDto } from '../dto/destinations.read.dto';

@Injectable()
export class DestinationsRepository
  extends BaseAbstractRepository<DestinationEntity>
  implements DestinationsRepositoryInterface
{
  constructor(
    @InjectRepository(DestinationEntity)
    private readonly destinationEntity: Repository<DestinationEntity>
  ) {
    super(destinationEntity);
  }

  async findDestinationWithManyPackages(
    paginateQueryDto: PaginateQueryDto
  ): Promise<ReadDestinationsDto[]> {
    const queryBuilder: SelectQueryBuilder<DestinationEntity> =
      this.destinationEntity
        .createQueryBuilder('destination')
        .leftJoin('destination.packages', 'package')
        .select('destination.name', 'name')
        .addSelect('destination.image', 'image')
        .addSelect('destination.id', 'destinationId')
        .addSelect('COUNT(package.id)', 'packages')
        .groupBy('destination.id')
        .having('COUNT(package.id) > 0');

    // Apply pagination
    const { limit, offset } = paginateQueryDto;
    if (limit !== undefined) {
      queryBuilder.take(limit);
    }
    if (offset !== undefined) {
      queryBuilder.skip(offset);
    }

    const result = await queryBuilder.getRawMany();
    return result.map((r) => {
      return {
        id: r.destinationId,
        name: r.name,
        image: r.image,
        packagesCount: parseInt(r.packages, 10),
      };
    });
  }
}
