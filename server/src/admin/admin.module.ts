import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { BulkImportService } from './bulk-import.service';
import { BulkImportController } from './bulk-import.controller';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { CarImage } from '../cars/car-image.entity';
import { CarInquiry } from '../cars/car-inquiry.entity';
import { CarView } from '../cars/car-view.entity';
import { UsersModule } from '../users/users.module';
import { CarsModule } from '../cars/cars.module';
import { EmailModule } from '../common/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Car,
      CarImage,
      CarInquiry,
      CarView,
    ]),
    MulterModule.register({}),
    UsersModule,
    CarsModule,
    EmailModule,
  ],
  controllers: [BulkImportController],
  providers: [AdminResolver, AdminService, BulkImportService],
  exports: [AdminService],
})
export class AdminModule {}
