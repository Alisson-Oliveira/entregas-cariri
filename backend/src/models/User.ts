import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Purchase from './Purchase';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;
 
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Purchase, purchase => purchase.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'userId' })
  purchases: Purchase[];
}