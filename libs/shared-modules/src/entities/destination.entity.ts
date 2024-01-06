import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageEntity } from './package.entity';
// import { Identity } from './base/identity.entity';

@Entity('destination')
export class DestinationEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @JoinTable()
  @ManyToMany(
    () => PackageEntity,
    (packageEntity) => packageEntity.destinations
  )
  packages: PackageEntity[];
}
