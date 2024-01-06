import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Identity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;
}
