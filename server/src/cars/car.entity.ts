import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@ObjectType()
@Entity('cars')
export class Car {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  make: string;

  @Field()
  @Column()
  model: string;

  @Field(() => Int)
  @Column()
  year: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column()
  mileage: number;

  @Field()
  @Column()
  fuelType: string;

  @Field()
  @Column()
  transmission: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bodyType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  images: string[];

  @Field()
  @Column()
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  countryCode?: string;

  @Field()
  @Column({ default: true })
  isAvailable: boolean;

  @Field()
  @Column({ default: false })
  isFeatured: boolean;

  @Column()
  sellerId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.cars, { eager: true })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}