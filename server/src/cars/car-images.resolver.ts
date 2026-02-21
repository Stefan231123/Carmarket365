import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { CarImage } from './car-image.entity';
import { CarImagesService } from './car-images.service';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateCarImageInput {
  @Field()
  carId: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  fileName?: string;

  @Field(() => Int, { nullable: true })
  fileSize?: number;

  @Field({ nullable: true })
  mimeType?: string;

  @Field(() => Int, { defaultValue: 0 })
  sortOrder: number;

  @Field({ nullable: true })
  caption?: string;

  @Field({ defaultValue: false })
  isPrimary: boolean;
}

@InputType()
class UpdateCarImageInput {
  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  fileName?: string;

  @Field(() => Int, { nullable: true })
  fileSize?: number;

  @Field({ nullable: true })
  mimeType?: string;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;

  @Field({ nullable: true })
  caption?: string;

  @Field({ nullable: true })
  isPrimary?: boolean;
}

@InputType()
class ImageOrderInput {
  @Field()
  id: string;

  @Field(() => Int)
  order: number;
}

@Resolver(() => CarImage)
export class CarImagesResolver {
  constructor(
    private readonly carImagesService: CarImagesService,
    private readonly carsService: CarsService,
  ) {}

  private async validateCarOwnership(carId: string, user: User): Promise<void> {
    const car = await this.carsService.findById(carId);
    if (user.role !== UserRole.ADMIN && car.sellerId !== user.id) {
      throw new ForbiddenException('You can only manage images for your own listings');
    }
  }

  @Query(() => [CarImage], { name: 'getCarImages' })
  async getCarImages(@Args('carId') carId: string): Promise<CarImage[]> {
    return this.carImagesService.findByCarId(carId);
  }

  @Query(() => CarImage, { name: 'getCarImageById' })
  async getCarImageById(@Args('id') id: string): Promise<CarImage> {
    return this.carImagesService.findById(id);
  }

  @Mutation(() => CarImage)
  @UseGuards(JwtAuthGuard)
  async createCarImage(
    @Args('input') createCarImageInput: CreateCarImageInput,
    @CurrentUser() user: User,
  ): Promise<CarImage> {
    await this.validateCarOwnership(createCarImageInput.carId, user);
    return this.carImagesService.create(createCarImageInput);
  }

  @Mutation(() => CarImage)
  @UseGuards(JwtAuthGuard)
  async updateCarImage(
    @Args('id') id: string,
    @Args('input') updateCarImageInput: UpdateCarImageInput,
    @CurrentUser() user: User,
  ): Promise<CarImage> {
    const image = await this.carImagesService.findById(id);
    await this.validateCarOwnership(image.carId, user);
    return this.carImagesService.update(id, updateCarImageInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCarImage(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const image = await this.carImagesService.findById(id);
    await this.validateCarOwnership(image.carId, user);
    return this.carImagesService.remove(id);
  }

  @Mutation(() => [CarImage])
  @UseGuards(JwtAuthGuard)
  async reorderCarImages(
    @Args('carId') carId: string,
    @Args('imageOrders', { type: () => [ImageOrderInput] }) imageOrders: ImageOrderInput[],
    @CurrentUser() user: User,
  ): Promise<CarImage[]> {
    await this.validateCarOwnership(carId, user);
    return this.carImagesService.reorderImages(carId, imageOrders);
  }
}