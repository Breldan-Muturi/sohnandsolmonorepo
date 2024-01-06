import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReviewEntity } from './reviews.entity';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  reviews: ReviewEntity[];
}

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.user)
  reviews: ReviewEntity[];
}
