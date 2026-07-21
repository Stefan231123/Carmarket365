import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Car } from './car.entity';
import { User } from '../users/user.entity';

export enum InquiryType {
  GENERAL = 'GENERAL',
  TEST_DRIVE = 'TEST_DRIVE',
  FINANCING = 'FINANCING',
  TRADE_IN = 'TRADE_IN',
  PRICE_NEGOTIATION = 'PRICE_NEGOTIATION',
  TECHNICAL_DETAILS = 'TECHNICAL_DETAILS',
  INSPECTION = 'INSPECTION',
}

export enum InquiryStatus {
  PENDING = 'PENDING',
  REPLIED = 'REPLIED',
  CLOSED = 'CLOSED',
  SPAM = 'SPAM',
}

registerEnumType(InquiryType, { name: 'InquiryType' });
registerEnumType(InquiryStatus, { name: 'InquiryStatus' });

@ObjectType()
@Entity('car_inquiries')
export class CarInquiry {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field(() => InquiryType)
  @Column({
    type: 'enum',
    enum: InquiryType,
    default: InquiryType.GENERAL,
  })
  type: InquiryType;

  @Field()
  @Column('text')
  message: string;

  @Field(() => InquiryStatus)
  @Column({
    type: 'enum',
    enum: InquiryStatus,
    default: InquiryStatus.PENDING,
  })
  status: InquiryStatus;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  sellerResponse?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  preferredContactMethod?: string; // 'email', 'phone', 'both'

  @Field({ nullable: true })
  @Column({ nullable: true })
  preferredTestDriveDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tradeInVehicle?: string; // Details about trade-in vehicle

  @Field({ nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  offerPrice?: number; // For price negotiations

  // Internal-only (abuse investigation / GDPR). NOT exposed via GraphQL so sellers
  // cannot harvest the IP address / user-agent of people who inquire.
  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column()
  carId: string;

  @Field(() => Car)
  @ManyToOne(() => Car, car => car.inquiries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column({ nullable: true })
  userId?: string; // If inquiry is from registered user

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  repliedAt?: Date;
}