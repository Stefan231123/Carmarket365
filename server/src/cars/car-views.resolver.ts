import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CarView } from './car-view.entity';
import { CarViewsService, CreateCarViewData } from './car-views.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { InputType } from '@nestjs/graphql';

@InputType()
class RecordCarViewInput {
  @Field()
  carId: string;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  userAgent?: string;

  @Field({ nullable: true })
  referrer?: string;

  @Field({ nullable: true })
  sessionId?: string;

  @Field({ nullable: true })
  countryCode?: string;

  @Field({ nullable: true })
  city?: string;
}

@ObjectType()
class CarViewStats {
  @Field()
  carId: string;

  @Field(() => Int)
  totalViews: number;

  @Field(() => Int)
  uniqueViews: number;
}

@ObjectType()
class PopularCar {
  @Field()
  carId: string;

  @Field(() => Int)
  viewCount: number;
}

@Resolver(() => CarView)
export class CarViewsResolver {
  constructor(private readonly carViewsService: CarViewsService) {}

  @Mutation(() => CarView)
  async recordCarView(
    @Args('input') recordCarViewInput: RecordCarViewInput,
    @CurrentUser() user?: User,
  ): Promise<CarView> {
    const viewData: CreateCarViewData = {
      ...recordCarViewInput,
      userId: user?.id,
    };

    return this.carViewsService.recordView(viewData);
  }

  @Query(() => [CarView], { name: 'getCarViews' })
  @UseGuards(JwtAuthGuard)
  async getCarViews(@Args('carId') carId: string): Promise<CarView[]> {
    return this.carViewsService.getViewsByCarId(carId);
  }

  @Query(() => CarViewStats, { name: 'getCarViewStats' })
  async getCarViewStats(@Args('carId') carId: string): Promise<CarViewStats> {
    const [totalViews, uniqueViews] = await Promise.all([
      this.carViewsService.getViewCountByCarId(carId),
      this.carViewsService.getUniqueViewCountByCarId(carId),
    ]);

    return {
      carId,
      totalViews,
      uniqueViews,
    };
  }

  @Query(() => [CarView], { name: 'getRecentCarViews' })
  @UseGuards(JwtAuthGuard)
  async getRecentCarViews(
    @Args('limit', { type: () => Int, defaultValue: 50 }) limit: number,
  ): Promise<CarView[]> {
    return this.carViewsService.getRecentViews(limit);
  }

  @Query(() => [CarView], { name: 'getUserViewHistory' })
  @UseGuards(JwtAuthGuard)
  async getUserViewHistory(
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @CurrentUser() user: User,
  ): Promise<CarView[]> {
    return this.carViewsService.getUserViewHistory(user.id, limit);
  }

  @Query(() => [PopularCar], { name: 'getPopularCars' })
  async getPopularCars(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<PopularCar[]> {
    return this.carViewsService.getPopularCars(limit);
  }
}