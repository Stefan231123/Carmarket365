import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsEnum, Min, Max, MaxLength, ArrayMaxSize } from 'class-validator';
import { VehicleType, FuelType, TransmissionType, CarCondition, DrivetrainType } from '../car.entity';

@InputType()
export class CreateCarInput {
  @Field()
  @IsString()
  make: string;

  @Field()
  @IsString()
  model: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  variant?: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  mileage: number;

  @Field(() => VehicleType, { nullable: true })
  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @Field(() => FuelType)
  @IsEnum(FuelType)
  fuelType: FuelType;

  @Field(() => TransmissionType)
  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @Field(() => CarCondition, { nullable: true })
  @IsOptional()
  @IsEnum(CarCondition)
  condition?: CarCondition;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  interiorColor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  engineSize?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  horsePower?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(2)
  @Max(6)
  doors?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  seats?: number;

  @Field(() => DrivetrainType, { nullable: true })
  @IsOptional()
  @IsEnum(DrivetrainType)
  drivetrain?: DrivetrainType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(17)
  vin?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  features?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  safetyFeatures?: string[];

  @Field()
  @IsString()
  @MaxLength(255)
  location: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  allowTestDrive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  acceptsTradeIn?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  priceNegotiable?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  quickSale?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fuelConsumption?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emissionClass?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  warrantyMonths?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  previousOwners?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  hadAccident?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  nonSmokingVehicle?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  fullServiceHistory?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  upholsteryType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paintWorkType?: string;
}

@InputType()
export class UpdateCarInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  make?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  model?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  variant?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @Field(() => VehicleType, { nullable: true })
  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @Field(() => FuelType, { nullable: true })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @Field(() => TransmissionType, { nullable: true })
  @IsOptional()
  @IsEnum(TransmissionType)
  transmission?: TransmissionType;

  @Field(() => CarCondition, { nullable: true })
  @IsOptional()
  @IsEnum(CarCondition)
  condition?: CarCondition;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  interiorColor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  engineSize?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  horsePower?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(2)
  @Max(6)
  doors?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  seats?: number;

  @Field(() => DrivetrainType, { nullable: true })
  @IsOptional()
  @IsEnum(DrivetrainType)
  drivetrain?: DrivetrainType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(17)
  vin?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  features?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  safetyFeatures?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  allowTestDrive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  acceptsTradeIn?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  priceNegotiable?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fuelConsumption?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emissionClass?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  warrantyMonths?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  previousOwners?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  hadAccident?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  nonSmokingVehicle?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  fullServiceHistory?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  upholsteryType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paintWorkType?: string;
}

@InputType()
export class CarFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  make?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  model?: string;

  @Field(() => VehicleType, { nullable: true })
  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  minYear?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  maxYear?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  maxMileage?: number;

  @Field(() => FuelType, { nullable: true })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @Field(() => TransmissionType, { nullable: true })
  @IsOptional()
  @IsEnum(TransmissionType)
  transmission?: TransmissionType;

  @Field(() => CarCondition, { nullable: true })
  @IsOptional()
  @IsEnum(CarCondition)
  condition?: CarCondition;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isCertified?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  minEngineSize?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  maxEngineSize?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  minHorsePower?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  maxHorsePower?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  doors?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  seats?: number;

  @Field(() => DrivetrainType, { nullable: true })
  @IsOptional()
  @IsEnum(DrivetrainType)
  drivetrain?: DrivetrainType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  maxPreviousOwners?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  hadAccident?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  nonSmokingVehicle?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  fullServiceHistory?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  upholsteryType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paintWorkType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  emissionClass?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  interiorColor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  sellerId?: string;
}