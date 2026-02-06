import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SavedCar } from './saved-car.entity';
import { SavedCarsService } from './saved-cars.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './user.entity';

@ObjectType()
class SavedCarStats {
  @Field(() => Int)
  userSavedCount: number;
}

@ObjectType()
class PopularSavedCar {
  @Field()
  carId: string;

  @Field(() => Int)
  saveCount: number;
}

@Resolver(() => SavedCar)
export class SavedCarsResolver {
  constructor(private readonly savedCarsService: SavedCarsService) {}

  @Mutation(() => SavedCar)
  @UseGuards(JwtAuthGuard)
  async saveCar(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<SavedCar> {
    return this.savedCarsService.saveCar(user.id, carId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async unsaveCar(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.savedCarsService.unsaveCar(user.id, carId);
  }

  @Query(() => [SavedCar], { name: 'getUserSavedCars' })
  @UseGuards(JwtAuthGuard)
  async getUserSavedCars(@CurrentUser() user: User): Promise<SavedCar[]> {
    return this.savedCarsService.getUserSavedCars(user.id);
  }

  @Query(() => Boolean, { name: 'isCarSaved' })
  @UseGuards(JwtAuthGuard)
  async isCarSaved(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.savedCarsService.isCarSaved(user.id, carId);
  }

  @Query(() => SavedCarStats, { name: 'getSavedCarStats' })
  @UseGuards(JwtAuthGuard)
  async getSavedCarStats(@CurrentUser() user: User): Promise<SavedCarStats> {
    const userSavedCount = await this.savedCarsService.getSavedCarCount(user.id);
    return { userSavedCount };
  }

  @Query(() => Int, { name: 'getCarSaveCount' })
  async getCarSaveCount(@Args('carId') carId: string): Promise<number> {
    return this.savedCarsService.getCarSaveCount(carId);
  }

  @Query(() => [PopularSavedCar], { name: 'getMostSavedCars' })
  async getMostSavedCars(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<PopularSavedCar[]> {
    return this.savedCarsService.getMostSavedCars(limit);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async clearUserSavedCars(@CurrentUser() user: User): Promise<boolean> {
    return this.savedCarsService.clearUserSavedCars(user.id);
  }
}