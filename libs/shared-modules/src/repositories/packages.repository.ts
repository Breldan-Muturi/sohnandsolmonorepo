import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageEntity } from '../entities/package.entity';
import { PackagesRepositoryInterface } from '../interfaces/packages.repository.interface';

@Injectable()
export class PackagesRepository
  extends BaseAbstractRepository<PackageEntity>
  implements PackagesRepositoryInterface
{
  constructor(
    @InjectRepository(PackageEntity)
    private readonly PackageEntity: Repository<PackageEntity>
  ) {
    super(PackageEntity);
  }
}
