import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CarInquiry, InquiryType, InquiryStatus } from './car-inquiry.entity';
import { CarInquiriesService, CreateCarInquiryData, UpdateCarInquiryData } from './car-inquiries.service';
import { RecaptchaService } from '../common/recaptcha/recaptcha.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
class CreateCarInquiryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  carId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  inquirerName: string;

  @Field()
  @IsEmail()
  inquirerEmail: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  inquirerPhone?: string;

  @Field(() => InquiryType)
  @IsEnum(InquiryType)
  inquiryType: InquiryType;

  @Field()
  @IsString()
  @IsNotEmpty()
  message: string;
}

@InputType()
class UpdateCarInquiryInput {
  @Field(() => InquiryStatus, { nullable: true })
  status?: InquiryStatus;

  @Field({ nullable: true })
  response?: string;
}

@ObjectType()
class InquiryStats {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  responded: number;

  @Field(() => Int)
  closed: number;
}

@Resolver(() => CarInquiry)
export class CarInquiriesResolver {
  constructor(
    private readonly carInquiriesService: CarInquiriesService,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  @Mutation(() => CarInquiry)
  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  async createCarInquiry(
    @Args('input') createCarInquiryInput: CreateCarInquiryInput,
    @Args('captchaToken', { nullable: true }) captchaToken?: string,
    @CurrentUser() user?: User,
  ): Promise<CarInquiry> {
    const isHuman = await this.recaptchaService.verify(captchaToken, 'inquiry');
    if (!isHuman) {
      throw new UnauthorizedException('CAPTCHA verification failed');
    }

    const inquiryData: CreateCarInquiryData = {
      ...createCarInquiryInput,
      userId: user?.id,
    };

    return this.carInquiriesService.create(inquiryData);
  }

  @Query(() => CarInquiry, { name: 'getCarInquiryById' })
  @UseGuards(JwtAuthGuard)
  async getCarInquiryById(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<CarInquiry> {
    const inquiry = await this.carInquiriesService.findById(id);
    const canView =
      inquiry.car.sellerId === user.id ||
      inquiry.userId === user.id ||
      user.role === UserRole.ADMIN;
    if (!canView) {
      throw new ForbiddenException('You can only view your own inquiries');
    }
    return inquiry;
  }

  @Query(() => [CarInquiry], { name: 'getCarInquiries' })
  @UseGuards(JwtAuthGuard)
  async getCarInquiries(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<CarInquiry[]> {
    return this.carInquiriesService.findByCarId(carId, user);
  }

  @Query(() => [CarInquiry], { name: 'getUserInquiries' })
  @UseGuards(JwtAuthGuard)
  async getUserInquiries(@CurrentUser() user: User): Promise<CarInquiry[]> {
    return this.carInquiriesService.findByUserId(user.id);
  }

  @Query(() => [CarInquiry], { name: 'getSellerInquiries' })
  @UseGuards(JwtAuthGuard)
  async getSellerInquiries(@CurrentUser() user: User): Promise<CarInquiry[]> {
    return this.carInquiriesService.findByCarOwnerId(user.id);
  }

  @Query(() => [CarInquiry], { name: 'getRecentInquiries' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getRecentInquiries(
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
  ): Promise<CarInquiry[]> {
    return this.carInquiriesService.getRecentInquiries(limit);
  }

  @Query(() => InquiryStats, { name: 'getInquiryStats' })
  @UseGuards(JwtAuthGuard)
  async getInquiryStats(
    @CurrentUser() user: User,
    @Args('carId', { nullable: true }) carId?: string,
  ): Promise<InquiryStats> {
    if (carId) {
      await this.carInquiriesService.assertCanViewCarInquiries(carId, user);
    } else if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can view platform-wide inquiry stats');
    }
    return this.carInquiriesService.getInquiryStats(carId);
  }

  @Mutation(() => CarInquiry)
  @UseGuards(JwtAuthGuard)
  async updateCarInquiry(
    @Args('id') id: string,
    @Args('input') updateCarInquiryInput: UpdateCarInquiryInput,
    @CurrentUser() user: User,
  ): Promise<CarInquiry> {
    const updateData: UpdateCarInquiryData = updateCarInquiryInput;
    return this.carInquiriesService.updateStatus(id, updateData, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCarInquiry(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.carInquiriesService.remove(id, user);
  }
}