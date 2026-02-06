import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Car } from './car.entity';
import { User } from '../users/user.entity';

@ObjectType()
@Entity('car_views')
@Index(['carId', 'createdAt'])
@Index(['userId', 'carId'], { unique: true, where: '"userId" IS NOT NULL' })
export class CarView {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userAgent?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  referrer?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sessionId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  countryCode?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Column()
  carId: string;

  @Field(() => Car)
  @ManyToOne(() => Car, car => car.views, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column({ nullable: true })
  userId?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}