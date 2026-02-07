import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { AdminStats, RecentActivity, SystemHealth, UserStats } from './dto/admin-stats.dto';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => AdminStats)
  async getAdminStats(): Promise<AdminStats> {
    return this.adminService.getAdminStats();
  }

  @Query(() => [RecentActivity])
  async getRecentActivity(): Promise<RecentActivity[]> {
    return this.adminService.getRecentActivity();
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }

  @Query(() => [Car])
  async getAllListings(): Promise<Car[]> {
    return this.adminService.getAllListings();
  }

  @Query(() => SystemHealth)
  async getSystemHealth(): Promise<SystemHealth> {
    return this.adminService.getSystemHealth();
  }

  @Query(() => UserStats)
  async getUserStats(): Promise<UserStats> {
    return this.adminService.getUserStats();
  }

  @Mutation(() => User)
  async updateUserStatus(
    @Args('userId') userId: string,
    @Args('status') status: 'active' | 'suspended'
  ): Promise<User> {
    return this.adminService.updateUserStatus(userId, status);
  }

  @Mutation(() => Car)
  async flagListing(
    @Args('carId') carId: string,
    @Args('reason') reason: string
  ): Promise<Car> {
    return this.adminService.flagListing(carId, reason);
  }
}