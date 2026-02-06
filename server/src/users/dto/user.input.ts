import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsPhoneNumber, IsUrl, IsEnum, IsObject } from 'class-validator';
import { UserRole, DealerStatus } from '../user.entity';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

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
  @IsString()
  preferredLanguage?: string;
}

@InputType()
export class UpdateDealerProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dealerLicenseNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber()
  businessPhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessDescription?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  dealerWorkingHours?: any;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  dealerServices?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessLogoUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  taxNumber?: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  currentPassword: string;

  @Field()
  @IsString()
  newPassword: string;
}