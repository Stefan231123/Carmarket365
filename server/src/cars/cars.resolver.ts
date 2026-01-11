import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { CreateCarInput, UpdateCarInput, CarFilterInput } from './dto/car.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query(() => [Car], { name: 'getCars' })
  async getCars(
    @Args('filters', { type: () => CarFilterInput, nullable: true }) filters?: CarFilterInput,
  ): Promise<Car[]> {
    return this.carsService.findAll(filters);
  }

  @Query(() => Car, { name: 'getCarById' })
  async getCarById(@Args('id') id: string): Promise<Car> {
    return this.carsService.findById(id);
  }

  @Query(() => [Car], { name: 'getCarsByMake' })
  async getCarsByMake(@Args('make') make: string): Promise<Car[]> {
    return this.carsService.findByMake(make);
  }

  @Query(() => [Car], { name: 'getFeaturedCars' })
  async getFeaturedCars(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<Car[]> {
    return this.carsService.getFeaturedCars(limit);
  }

  @Query(() => [String], { name: 'getCarMakes' })
  async getCarMakes(): Promise<string[]> {
    return this.carsService.getCarMakes();
  }

  @Query(() => [String], { name: 'getCarModels' })
  async getCarModels(@Args('make') make: string): Promise<string[]> {
    return this.carsService.getCarModels(make);
  }

  @Mutation(() => Car)
  @UseGuards(JwtAuthGuard)
  async createCar(
    @Args('input') createCarInput: CreateCarInput,
    @CurrentUser() user: User,
  ): Promise<Car> {
    return this.carsService.create(createCarInput, user);
  }

  @Mutation(() => Car)
  @UseGuards(JwtAuthGuard)
  async updateCar(
    @Args('id') id: string,
    @Args('input') updateCarInput: UpdateCarInput,
    @CurrentUser() user: User,
  ): Promise<Car> {
    return this.carsService.update(id, updateCarInput, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCar(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.carsService.remove(id, user);
  }
}