import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CarImage } from './car-image.entity';
import { CarView } from './car-view.entity';
import { CarInquiry } from './car-inquiry.entity';
import { SavedCar } from '../users/saved-car.entity';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { CarImagesService } from './car-images.service';
import { CarViewsService } from './car-views.service';
import { CarInquiriesService } from './car-inquiries.service';
import { CarImagesResolver } from './car-images.resolver';
import { CarViewsResolver } from './car-views.resolver';
import { CarInquiriesResolver } from './car-inquiries.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car, CarImage, CarView, CarInquiry, SavedCar]), UsersModule],
  providers: [
    CarsService,
    CarsResolver,
    CarImagesService,
    CarImagesResolver,
    CarViewsService,
    CarViewsResolver,
    CarInquiriesService,
    CarInquiriesResolver,
  ],
  exports: [CarsService, CarImagesService, CarViewsService, CarInquiriesService],
})
export class CarsModule {}