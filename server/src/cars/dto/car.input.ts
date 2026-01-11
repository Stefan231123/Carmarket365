import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, Min, Max } from 'class-validator';

@InputType()
export class CreateCarInput {
  @Field()
  @IsString()
  make: string;

  @Field()
  @IsString()
  model: string;

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

  @Field()
  @IsString()
  fuelType: string;

  @Field()
  @IsString()
  transmission: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bodyType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @Field()
  @IsString()
  location: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fuelType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  transmission?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bodyType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fuelType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  transmission?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bodyType?: string;

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
}