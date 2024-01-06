import { ReviewEntity } from '../entities/reviews.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type ReviewsRepositoryInterface = BaseInterfaceRepository<ReviewEntity>;
