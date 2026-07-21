import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { CarImage } from './car-image.entity';
import { CarImagesService } from './car-images.service';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

@InputType()
class CreateCarImageInput {
  @Field()
  @IsString()
  carId: string;

  @Field()
  @IsString()
  url: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fileName?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  sortOrder: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  caption?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  isPrimary: boolean;
}

@InputType()
class UpdateCarImageInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fileName?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  caption?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

@InputType()
class ImageOrderInput {
  @Field()
  @IsString()
  id: string;

  @Field(() => Int)
  @IsNumber()
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
    // Map input field names to entity field names
    const entityData: Partial<CarImage> = {
      carId: createCarImageInput.carId,
      url: createCarImageInput.url,
      originalFileName: createCarImageInput.fileName,
      fileSize: createCarImageInput.fileSize,
      mimeType: createCarImageInput.mimeType,
      sortOrder: createCarImageInput.sortOrder,
      isMain: createCarImageInput.isPrimary,
    };
    return this.carImagesService.create(entityData);
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