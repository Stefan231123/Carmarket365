import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
  CreateDateColumn, UpdateDateColumn, JoinColumn, Index,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { PublicSeller } from '../cars/public-seller.type';
import { Message } from './message.entity';

/**
 * A one-to-one thread between a buyer and a seller, optionally about a specific
 * listing. There is at most one conversation per (car, buyer, seller) triple.
 */
@ObjectType({ description: 'A message thread between a buyer and a seller' })
@Entity('conversations')
@Index(['carId', 'buyerId', 'sellerId'], { unique: true })
export class Conversation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  carId?: string;

  @Field(() => Car, { nullable: true })
  @ManyToOne(() => Car, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'carId' })
  car?: Car;

  @Column({ type: 'uuid' })
  buyerId: string;

  @Field(() => PublicSeller)
  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @Column({ type: 'uuid' })
  sellerId: string;

  @Field(() => PublicSeller)
  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (m) => m.conversation)
  messages?: Message[];

  @Field()
  @Column({ type: 'timestamp', default: () => 'now()' })
  lastMessageAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Populated per-request by the service for the current user; not a column.
  @Field(() => Int, { description: 'Unread messages for the requesting user' })
  unreadCount = 0;
}
