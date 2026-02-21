import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

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
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

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