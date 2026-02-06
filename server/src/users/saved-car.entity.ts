import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Car } from '../cars/car.entity';

@ObjectType()
@Entity('saved_cars')
@Index(['userId', 'carId'], { unique: true })
export class SavedCar {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.savedCars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  carId: string;

  @Field(() => Car)
  @ManyToOne(() => Car, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}