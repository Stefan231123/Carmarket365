import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SavedCar } from './saved-car.entity';
import { SearchAlert } from './search-alert.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SavedCarsService } from './saved-cars.service';
import { SavedCarsResolver } from './saved-cars.resolver';
import { SearchAlertsService } from './search-alerts.service';
import { SearchAlertsResolver } from './search-alerts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, SavedCar, SearchAlert])],
  providers: [
    UsersService, 
    UsersResolver,
    SavedCarsService,
    SavedCarsResolver,
    SearchAlertsService,
    SearchAlertsResolver,
  ],
  exports: [UsersService, SavedCarsService, SearchAlertsService],
})
export class UsersModule {}