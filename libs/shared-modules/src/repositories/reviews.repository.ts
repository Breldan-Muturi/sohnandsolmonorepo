import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../entities/reviews.entity';
import { ReviewsRepositoryInterface } from '../interfaces/reviews.repository.interface';

@Injectable()
export class ReviewsRepository
  extends BaseAbstractRepository<ReviewEntity>
  implements ReviewsRepositoryInterface
{
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly ReviewEntity: Repository<ReviewEntity>
  ) {
    super(ReviewEntity);
  }
}
