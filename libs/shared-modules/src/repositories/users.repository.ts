import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryInterface } from '../interfaces/users.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<UserEntity>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserEntity: Repository<UserEntity>
  ) {
    super(UserEntity);
  }
}
