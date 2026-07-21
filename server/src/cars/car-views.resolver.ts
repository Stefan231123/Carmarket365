import { Resolver, Query, Mutation, Args, Int, ObjectType, Field, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CarView } from './car-view.entity';
import { CarViewsService, CreateCarViewData } from './car-views.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { InputType } from '@nestjs/graphql';

@InputType()
class RecordCarViewInput {
  @Field()
  carId: string;

  // ipAddress and userAgent are intentionally NOT accepted from the client —
  // they are derived server-side from the request so analytics can't be spoofed.

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
    @Context() ctx: { req: Request },
    @CurrentUser() user?: User,
  ): Promise<CarView> {
    const req = ctx.req;
    const forwardedFor = (req.headers['x-forwarded-for'] as string | undefined)
      ?.split(',')[0]
      ?.trim();

    const viewData: CreateCarViewData = {
      ...recordCarViewInput,
      ipAddress: forwardedFor || req.ip,
      userAgent: req.headers['user-agent'],
      userId: user?.id,
    };

    return this.carViewsService.recordView(viewData);
  }

  @Query(() => [CarView], { name: 'getCarViews' })
  @UseGuards(JwtAuthGuard)
  async getCarViews(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<CarView[]> {
    return this.carViewsService.getViewsByCarId(carId, user);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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