import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Car } from '../cars/car.entity';
import { SavedCar } from './saved-car.entity';
import { SearchAlert } from './search-alert.entity';

export enum UserRole {
  USER = 'USER',
  DEALER = 'DEALER', 
  ADMIN = 'ADMIN',
}

export enum DealerStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(DealerStatus, { name: 'DealerStatus' });

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hidden from GraphQL

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string;

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emailVerificationToken?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passwordResetToken?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passwordResetExpires?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLoginAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  languagePreference?: string; // mk, sq, en, etc.

  @Field({ nullable: true })
  @Column({ nullable: true })
  countryPreference?: string;

  @Field()
  @Column({ default: true })
  marketingEmailsEnabled: boolean;

  @Field()
  @Column({ default: false })
  smsNotificationsEnabled: boolean;

  // Dealer-specific fields
  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerBusinessNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerLicenseNumber?: string;

  @Field(() => DealerStatus, { nullable: true })
  @Column({
    type: 'enum',
    enum: DealerStatus,
    nullable: true,
  })
  dealerStatus?: DealerStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerLogoUrl?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  dealerDescription?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerAddress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerCity?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerRegion?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerPostalCode?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerCountry?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerPhoneNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerWebsite?: string;

  @Field({ nullable: true })
  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  dealerLatitude?: number;

  @Field({ nullable: true })
  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  dealerLongitude?: number;

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  dealerWorkingHours: string[]; // e.g., ["Mon: 9-18", "Tue: 9-18"]

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  dealerServices: string[]; // e.g., ["Financing", "Trade-in", "Service"]

  // Relationships
  @Field(() => [Car])
  @OneToMany(() => Car, car => car.seller)
  cars: Car[];

  @Field(() => [SavedCar])
  @OneToMany(() => SavedCar, savedCar => savedCar.user)
  savedCars: SavedCar[];

  @Field(() => [SearchAlert])
  @OneToMany(() => SearchAlert, searchAlert => searchAlert.user)
  searchAlerts: SearchAlert[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dealerApprovedAt?: Date;
}