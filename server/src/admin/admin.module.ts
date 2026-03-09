import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { CarImage } from '../cars/car-image.entity';
import { CarInquiry } from '../cars/car-inquiry.entity';
import { CarView } from '../cars/car-view.entity';
import { UsersModule } from '../users/users.module';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Car,
      CarImage,
      CarInquiry,
      CarView,
    ]),
    UsersModule,
    CarsModule,
  ],
  providers: [AdminResolver, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
