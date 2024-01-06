import { Entity, OneToMany } from 'typeorm';
import { PackageEntity } from './package.entity';
import { Identity } from './base/identity.entity';
import { ReviewEntity } from './reviews.entity';

@Entity('tour-operators')
export class TourOperatorsEntity extends Identity {
  @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.tourOperator)
  reviews: ReviewEntity[];

  @OneToMany(() => PackageEntity, (packageEntity) => packageEntity.tourOperator)
  packages: PackageEntity[];
}
