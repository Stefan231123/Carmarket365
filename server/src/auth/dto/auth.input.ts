import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../users/user.entity';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  // Dealer-specific fields
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dealerName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dealerAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dealerCity?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dealerPhoneNumber?: string;
}

@InputType()
export class SocialAuthInput {
  @Field()
  @IsString()
  provider: string; // 'google' | 'facebook'

  @Field()
  @IsString()
  accessToken: string;
}