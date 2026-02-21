import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { User, UserRole } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'getUsers', description: 'List all users. Admin only.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserById', description: 'Get a user by ID. Users can only view their own profile.' })
  @UseGuards(JwtAuthGuard)
  async getUserById(
    @Args('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    // Non-admin users can only view their own profile
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only view your own profile');
    }
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Query(() => User, { name: 'getCurrentUser', description: 'Get the currently authenticated user.' })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async addToSavedListings(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateSavedListings(user.id, carId, 'add');
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async removeFromSavedListings(
    @Args('carId') carId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateSavedListings(user.id, carId, 'remove');
  }
}