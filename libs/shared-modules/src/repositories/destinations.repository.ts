import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DestinationsRepositoryInterface } from '../interfaces/destinations.repository.interface';
import { DestinationEntity } from '../entities/destination.entity';

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
}
