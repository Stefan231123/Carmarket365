import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'getUsers' })
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  @UseGuards(JwtAuthGuard)
  async getUserById(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Query(() => User, { name: 'getCurrentUser' })
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