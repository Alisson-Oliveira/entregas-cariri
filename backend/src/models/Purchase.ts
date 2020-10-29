import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('purchases')
export default class Purchase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  purchaseNumber: string;

  @Column()
  state: string;
 
  @Column()
  purchaseList: string;

  @ManyToOne(() => User, user => user.purchases)
  @JoinColumn({ name: 'userId' })
  user: User;
}