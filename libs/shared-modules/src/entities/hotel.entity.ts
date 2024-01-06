import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewEntity } from './reviews.entity';

@Entity('hotel')
export class HotelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { array: true })
  photos: string[];

  @Column({ nullable: true })
  location: number;

  @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.user)
  reviews: ReviewEntity[];
}
