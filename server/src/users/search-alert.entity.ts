import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Int, Float, registerEnumType } from '@nestjs/graphql';
import { User } from './user.entity';
import { VehicleType, FuelType, TransmissionType } from '../cars/car.entity';

export enum AlertFrequency {
  INSTANT = 'INSTANT',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

registerEnumType(AlertFrequency, {
  name: 'AlertFrequency',
  description: 'The frequency of search alert notifications',
});

@ObjectType()
@Entity('search_alerts')
export class SearchAlert {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string; // User-defined name for the alert

  @Field({ nullable: true })
  @Column({ nullable: true })
  make?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  model?: string;

  @Field(() => VehicleType, { nullable: true })
  @Column({
    type: 'enum',
    enum: VehicleType,
    nullable: true,
  })
  vehicleType?: VehicleType;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  yearFrom?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  yearTo?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  priceFrom?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  priceTo?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  mileageFrom?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  mileageTo?: number;

  @Field(() => FuelType, { nullable: true })
  @Column({
    type: 'enum',
    enum: FuelType,
    nullable: true,
  })
  fuelType?: FuelType;

  @Field(() => TransmissionType, { nullable: true })
  @Column({
    type: 'enum',
    enum: TransmissionType,
    nullable: true,
  })
  transmission?: TransmissionType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  countryCode?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  radiusKm?: number; // Search radius

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  features: string[];

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: true })
  emailNotifications: boolean;

  @Field()
  @Column({ default: false })
  smsNotifications: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastNotificationSent?: Date;

  @Field(() => Int)
  @Column({ default: 0 })
  matchCount: number; // Total matches found

  @Field(() => Int)
  @Column({ default: 0 })
  newMatchCount: number; // New matches since last notification

  @Field(() => AlertFrequency)
  @Column({
    type: 'enum',
    enum: AlertFrequency,
    default: AlertFrequency.DAILY,
  })
  frequency: AlertFrequency;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastTriggered?: Date;

  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.searchAlerts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}