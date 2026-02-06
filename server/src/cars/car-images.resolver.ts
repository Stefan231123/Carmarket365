import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CarImage } from './car-image.entity';
import { CarImagesService } from './car-images.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
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
  constructor(private readonly carImagesService: CarImagesService) {}

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
    return this.carImagesService.create(createCarImageInput);
  }

  @Mutation(() => CarImage)
  @UseGuards(JwtAuthGuard)
  async updateCarImage(
    @Args('id') id: string,
    @Args('input') updateCarImageInput: UpdateCarImageInput,
    @CurrentUser() user: User,
  ): Promise<CarImage> {
    return this.carImagesService.update(id, updateCarImageInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCarImage(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.carImagesService.remove(id);
  }

  @Mutation(() => [CarImage])
  @UseGuards(JwtAuthGuard)
  async reorderCarImages(
    @Args('carId') carId: string,
    @Args('imageOrders', { type: () => [ImageOrderInput] }) imageOrders: ImageOrderInput[],
    @CurrentUser() user: User,
  ): Promise<CarImage[]> {
    return this.carImagesService.reorderImages(carId, imageOrders);
  }
}