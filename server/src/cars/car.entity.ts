import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Int, Float, registerEnumType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { CarImage } from './car-image.entity';
import { CarView } from './car-view.entity';
import { CarInquiry } from './car-inquiry.entity';

export enum VehicleType {
  CAR = 'CAR',
  MOTORCYCLE = 'MOTORCYCLE',
  TRUCK = 'TRUCK',
  VAN = 'VAN',
  SUV = 'SUV',
  COUPE = 'COUPE',
  CONVERTIBLE = 'CONVERTIBLE',
  WAGON = 'WAGON',
  HATCHBACK = 'HATCHBACK',
  SEDAN = 'SEDAN',
}

export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  PLUGIN_HYBRID = 'PLUGIN_HYBRID',
  LPG = 'LPG',
  CNG = 'CNG',
  HYDROGEN = 'HYDROGEN',
}

export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
  CVT = 'CVT',
}

export enum CarCondition {
  NEW = 'NEW',
  USED = 'USED',
  CERTIFIED = 'CERTIFIED',
  DAMAGED = 'DAMAGED',
}

export enum DrivetrainType {
  FWD = 'FWD', // Front-wheel drive
  RWD = 'RWD', // Rear-wheel drive
  AWD = 'AWD', // All-wheel drive
  FOUR_WD = 'FOUR_WD', // 4-wheel drive
}

registerEnumType(VehicleType, { name: 'VehicleType', description: 'Vehicle body type classification' });
registerEnumType(FuelType, { name: 'FuelType', description: 'Engine fuel type' });
registerEnumType(TransmissionType, { name: 'TransmissionType', description: 'Transmission/gearbox type' });
registerEnumType(CarCondition, { name: 'CarCondition', description: 'Vehicle condition category' });
registerEnumType(DrivetrainType, { name: 'DrivetrainType', description: 'Drivetrain configuration' });

@ObjectType({ description: 'A car listing on the marketplace' })
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  variant?: string; // e.g., "Sport", "Luxury", "Base"

  @Field(() => Int)
  @Column()
  year: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column()
  mileage: number;

  @Field(() => VehicleType)
  @Column({
    type: 'enum',
    enum: VehicleType,
    default: VehicleType.CAR,
  })
  vehicleType: VehicleType;

  @Field(() => FuelType)
  @Column({
    type: 'enum',
    enum: FuelType,
  })
  fuelType: FuelType;

  @Field(() => TransmissionType)
  @Column({
    type: 'enum',
    enum: TransmissionType,
  })
  transmission: TransmissionType;

  @Field(() => CarCondition)
  @Column({
    type: 'enum',
    enum: CarCondition,
    default: CarCondition.USED,
  })
  condition: CarCondition;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  interiorColor?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  engineSize?: number; // in CC

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  horsePower?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  doors?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  seats?: number;

  @Field(() => DrivetrainType, { nullable: true })
  @Column({
    type: 'enum',
    enum: DrivetrainType,
    nullable: true,
  })
  drivetrain?: DrivetrainType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  vin?: string; // Vehicle Identification Number

  @Field({ nullable: true })
  @Column({ nullable: true })
  licensePlate?: string;

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  features: string[]; // e.g., ["Air Conditioning", "Leather Seats", "Navigation System"]

  @Field(() => [String])
  @Column('text', { array: true, default: [] })
  safetyFeatures: string[]; // e.g., ["ABS", "Airbags", "ESP"]

  @Field()
  @Column()
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  countryCode?: string;

  @Field({ nullable: true })
  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  @Column('decimal', { precision: 10, scale: 6, nullable: true })
  longitude?: number;

  @Field()
  @Column({ default: true })
  isAvailable: boolean;

  @Field()
  @Column({ default: false })
  isFeatured: boolean;

  @Field()
  @Column({ default: false })
  isCertified: boolean;

  @Field()
  @Column({ default: false })
  isFlagged: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  flagReason?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  flaggedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  warrantyMonths?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  fuelConsumption?: number; // L/100km or MPG

  @Field({ nullable: true })
  @Column({ nullable: true })
  emissionClass?: string; // e.g., "Euro 6"

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  previousOwners?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hadAccident?: string; // 'YES', 'NO', 'UNKNOWN'

  @Field({ nullable: true })
  @Column({ nullable: true })
  nonSmokingVehicle?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fullServiceHistory?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  upholsteryType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paintWorkType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bodyType?: string; // e.g., "Sedan", "SUV", "Naked Bike", "Panel Van"

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  co2Emissions?: number; // g/km

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  numberOfGears?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  weight?: number; // kg (curb weight)

  // Motorcycle-specific fields
  @Field({ nullable: true })
  @Column({ nullable: true })
  coolingType?: string; // Air-cooled, Water-cooled, Oil-cooled

  @Field({ nullable: true })
  @Column({ nullable: true })
  starterType?: string; // Electric, Kick, Both

  @Field({ nullable: true })
  @Column({ nullable: true })
  licenseClass?: string; // AM, A1, A2, A

  @Field({ nullable: true })
  @Column({ nullable: true })
  cylinders?: string; // Single, Twin, Triple, Four, Six

  @Field(() => Int)
  @Column({ default: 0 })
  viewCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  favoriteCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  inquiryCount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactPhone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactEmail?: string;

  @Field()
  @Column({ default: false })
  allowTestDrive: boolean;

  @Field()
  @Column({ default: false })
  acceptsTradeIn: boolean;

  @Field({ nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  originalPrice?: number; // For tracking price changes

  @Field({ nullable: true })
  @Column({ nullable: true })
  priceNegotiable: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  quickSale: boolean; // For express sell feature

  @Column()
  sellerId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.cars, { eager: true })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Field(() => [CarImage], { defaultValue: [] })
  @OneToMany(() => CarImage, image => image.car, { cascade: true, eager: false })
  images: CarImage[];

  @Field(() => [CarView])
  @OneToMany(() => CarView, view => view.car)
  views: CarView[];

  @Field(() => [CarInquiry])
  @OneToMany(() => CarInquiry, inquiry => inquiry.car)
  inquiries: CarInquiry[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastPriceUpdate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  featuredUntil?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  soldAt?: Date;
}