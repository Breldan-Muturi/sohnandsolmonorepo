import { TourOperatorsEntity } from '../entities/tour-operators.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type TourOperatorsRepositoryInterface =
  BaseInterfaceRepository<TourOperatorsEntity>;
