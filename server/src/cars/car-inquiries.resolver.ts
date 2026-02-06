import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CarInquiry, InquiryType, InquiryStatus } from './car-inquiry.entity';
import { CarInquiriesService, CreateCarInquiryData, UpdateCarInquiryData } from './car-inquiries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { InputType } from '@nestjs/graphql';

@InputType()
class CreateCarInquiryInput {
  @Field()
  carId: string;

  @Field()
  inquirerName: string;

  @Field()
  inquirerEmail: string;

  @Field({ nullable: true })
  inquirerPhone?: string;

  @Field(() => InquiryType)
  inquiryType: InquiryType;

  @Field()
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
  constructor(private readonly carInquiriesService: CarInquiriesService) {}

  @Mutation(() => CarInquiry)
  async createCarInquiry(
    @Args('input') createCarInquiryInput: CreateCarInquiryInput,
    @CurrentUser() user?: User,
  ): Promise<CarInquiry> {
    const inquiryData: CreateCarInquiryData = {
      ...createCarInquiryInput,
      userId: user?.id,
    };

    return this.carInquiriesService.create(inquiryData);
  }

  @Query(() => CarInquiry, { name: 'getCarInquiryById' })
  @UseGuards(JwtAuthGuard)
  async getCarInquiryById(@Args('id') id: string): Promise<CarInquiry> {
    return this.carInquiriesService.findById(id);
  }

  @Query(() => [CarInquiry], { name: 'getCarInquiries' })
  @UseGuards(JwtAuthGuard)
  async getCarInquiries(@Args('carId') carId: string): Promise<CarInquiry[]> {
    return this.carInquiriesService.findByCarId(carId);
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
  @UseGuards(JwtAuthGuard)
  async getRecentInquiries(
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
  ): Promise<CarInquiry[]> {
    return this.carInquiriesService.getRecentInquiries(limit);
  }

  @Query(() => InquiryStats, { name: 'getInquiryStats' })
  @UseGuards(JwtAuthGuard)
  async getInquiryStats(
    @Args('carId', { nullable: true }) carId?: string,
  ): Promise<InquiryStats> {
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