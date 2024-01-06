import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { BaseInterfaceRepository } from './base.interface.repository';
import { PaginateQueryDto } from '../../dto/pagination.query.dto';

interface HasId {
  id: string;
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;
  constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return (await this.entity.findOneBy(options)) as T;
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return (await this.entity.findOne(filterCondition)) as T;
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async findPaginated(
    query: PaginateQueryDto,
    options?: FindManyOptions<T>
  ): Promise<[T[], number]> {
    const { limit, offset } = query;
    const [results, total] = await this.entity.findAndCount({
      ...options,
      take: limit,
      skip: offset,
    });
    return [results, total];
  }

  public async findCount(): Promise<number> {
    const total = await this.entity.count();
    return total;
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return (await this.entity.preload(entityLike)) as T;
  }
}
