import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminStats, RecentActivity, SystemHealth, UserStats } from './dto/admin-stats.dto';
import { User, UserRole } from '../users/user.entity';
import { Car } from '../cars/car.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
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