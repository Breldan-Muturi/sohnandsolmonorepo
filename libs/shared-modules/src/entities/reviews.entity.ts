import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PackageEntity } from './package.entity';
import { TourOperatorsEntity } from './tour-operators.entity';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  review: string;

  @Column('text', { array: true })
  reviewPhotos: string[];

  @CreateDateColumn()
  reviewDate: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.reviews)
  user: UserEntity;

  @ManyToOne(() => PackageEntity, (packageEntity) => packageEntity.reviews)
  package: PackageEntity;

  @ManyToOne(
    () => TourOperatorsEntity,
    (tourOperatorEntity) => tourOperatorEntity.reviews
  )
  tourOperator: TourOperatorsEntity;
}
