import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReviewEntity } from './reviews.entity';
import { DestinationEntity } from './destination.entity';
import { TourOperatorsEntity } from './tour-operators.entity';

@Entity('package')
export class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column('text', { array: true })
  photos: string[];

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column('text', { array: true, nullable: true })
  ammenities: string[];

  @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.user)
  reviews: ReviewEntity[];

  @ManyToMany(
    () => DestinationEntity,
    (destinationEntity) => destinationEntity.packages
  )
  destinations: DestinationEntity[];

  @ManyToOne(
    () => TourOperatorsEntity,
    (tourOperatorEntity) => tourOperatorEntity.packages
  )
  tourOperator: TourOperatorsEntity;
}
