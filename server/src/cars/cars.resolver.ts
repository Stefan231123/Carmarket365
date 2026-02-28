import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { CreateCarInput, UpdateCarInput, CarFilterInput } from './dto/car.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CAR_MAKES, getModelsForMake } from '../shared/car-data';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query(() => [Car], { name: 'getCars', description: 'Browse available car listings with optional filters' })
  async getCars(
    @Args('filters', { type: () => CarFilterInput, nullable: true }) filters?: CarFilterInput,
  ): Promise<Car[]> {
    return this.carsService.findAll(filters);
  }

  @Query(() => Car, { name: 'getCarById', description: 'Get a single car listing by ID' })
  async getCarById(@Args('id') id: string): Promise<Car> {
    return this.carsService.findById(id);
  }

  @Query(() => [Car], { name: 'getCarsByMake', description: 'Get all available listings for a specific make' })
  async getCarsByMake(@Args('make') make: string): Promise<Car[]> {
    return this.carsService.findByMake(make);
  }

  @Query(() => [Car], { name: 'getFeaturedCars', description: 'Get featured/promoted car listings' })
  async getFeaturedCars(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<Car[]> {
    return this.carsService.getFeaturedCars(limit);
  }

  @Query(() => [String], { name: 'getCarMakes', description: 'Get distinct car makes available in the marketplace' })
  async getCarMakes(): Promise<string[]> {
    return this.carsService.getCarMakes();
  }

  @Query(() => [String], { name: 'getCarModels', description: 'Get distinct models for a specific car make' })
  async getCarModels(@Args('make') make: string): Promise<string[]> {
    return this.carsService.getCarModels(make);
  }

  @Query(() => [String], { name: 'getAllCarMakes', description: 'Get all supported car makes (reference data)' })
  async getAllCarMakes(): Promise<string[]> {
    return CAR_MAKES;
  }

  @Query(() => [String], { name: 'getAllCarModels', description: 'Get all supported models for a car make (reference data)' })
  async getAllCarModels(@Args('make') make: string): Promise<string[]> {
    return getModelsForMake(make);
  }

  @Query(() => [Car], { name: 'getMyListings', description: 'Get all listings for the current user (including quickSale)' })
  @UseGuards(JwtAuthGuard)
  async getMyListings(@CurrentUser() user: User): Promise<Car[]> {
    return this.carsService.findByUser(user.id);
  }

  @Query(() => [Car], { name: 'getExpressSaleOpportunities', description: 'Get express/quick sale listings (dealer-only visibility)' })
  @UseGuards(JwtAuthGuard)
  async getExpressSaleOpportunities(): Promise<Car[]> {
    return this.carsService.findQuickSaleListings();
  }

  @Mutation(() => Car, { description: 'Create a new car listing. Requires authentication.' })
  @UseGuards(JwtAuthGuard)
  async createCar(
    @Args('input') createCarInput: CreateCarInput,
    @CurrentUser() user: User,
  ): Promise<Car> {
    return this.carsService.create(createCarInput, user);
  }

  @Mutation(() => Car, { description: 'Update a car listing. Only the owner or admin can update.' })
  @UseGuards(JwtAuthGuard)
  async updateCar(
    @Args('id') id: string,
    @Args('input') updateCarInput: UpdateCarInput,
    @CurrentUser() user: User,
  ): Promise<Car> {
    return this.carsService.update(id, updateCarInput, user);
  }

  @Mutation(() => Boolean, { description: 'Delete a car listing. Only the owner or admin can delete.' })
  @UseGuards(JwtAuthGuard)
  async deleteCar(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.carsService.remove(id, user);
  }
}