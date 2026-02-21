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

  @Query(() => AdminStats, { description: 'Dashboard statistics: users, listings, views, inquiries.' })
  async getAdminStats(): Promise<AdminStats> {
    return this.adminService.getAdminStats();
  }

  @Query(() => [RecentActivity], { description: 'Recent platform activity feed (registrations, listings, inquiries).' })
  async getRecentActivity(): Promise<RecentActivity[]> {
    return this.adminService.getRecentActivity();
  }

  @Query(() => [User], { description: 'List all users (limited to 100). Admin only.' })
  async getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }

  @Query(() => [Car], { description: 'List all car listings with seller info. Admin only.' })
  async getAllListings(): Promise<Car[]> {
    return this.adminService.getAllListings();
  }

  @Query(() => SystemHealth, { description: 'Real-time system health: CPU, memory, DB connections, response time.' })
  async getSystemHealth(): Promise<SystemHealth> {
    return this.adminService.getSystemHealth();
  }

  @Query(() => UserStats, { description: 'User growth metrics: new users today/week/month, growth rate.' })
  async getUserStats(): Promise<UserStats> {
    return this.adminService.getUserStats();
  }

  @Mutation(() => User, { description: 'Activate or suspend a user account.' })
  async updateUserStatus(
    @Args('userId') userId: string,
    @Args('status') status: 'active' | 'suspended'
  ): Promise<User> {
    return this.adminService.updateUserStatus(userId, status);
  }

  @Mutation(() => Car, { description: 'Flag a listing for review with a reason.' })
  async flagListing(
    @Args('carId') carId: string,
    @Args('reason') reason: string
  ): Promise<Car> {
    return this.adminService.flagListing(carId, reason);
  }

  @Mutation(() => Car, { description: 'Remove flag from a listing.' })
  async unflagListing(
    @Args('carId') carId: string
  ): Promise<Car> {
    return this.adminService.unflagListing(carId);
  }
}