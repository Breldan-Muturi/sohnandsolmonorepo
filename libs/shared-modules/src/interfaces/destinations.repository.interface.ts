import { DestinationEntity } from '../entities/destination.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type DestinationsRepositoryInterface =
  BaseInterfaceRepository<DestinationEntity>;
