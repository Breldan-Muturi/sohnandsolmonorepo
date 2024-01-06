import { PackageEntity } from '../entities/package.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export type PackagesRepositoryInterface =
  BaseInterfaceRepository<PackageEntity>;
