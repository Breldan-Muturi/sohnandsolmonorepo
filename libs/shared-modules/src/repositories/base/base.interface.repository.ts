import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { PaginateQueryDto } from '../../dto/pagination.query.dto';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findOneById(id: string): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findPaginated(
    query: PaginateQueryDto,
    options?: FindManyOptions<T>
  ): Promise<[T[], number]>;
  remove(data: T): Promise<T>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  findCount(): Promise<number>;
}
