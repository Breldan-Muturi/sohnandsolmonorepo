import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourOperatorsEntity } from '../entities/tour-operators.entity';
import { TourOperatorsRepositoryInterface } from '../interfaces/tour-operators.repository.interface';

@Injectable()
export class TourOperatorsRepository
  extends BaseAbstractRepository<TourOperatorsEntity>
  implements TourOperatorsRepositoryInterface
{
  constructor(
    @InjectRepository(TourOperatorsEntity)
    private readonly tourOperatorsEntity: Repository<TourOperatorsEntity>
  ) {
    super(tourOperatorsEntity);
  }
}
