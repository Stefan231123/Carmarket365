import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';
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

  @Query(() => [User], { name: 'getApprovedDealers', description: 'List all approved dealers visible to the public.' })
  async getApprovedDealers(): Promise<User[]> {
    return this.usersService.getApprovedDealers();
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

  // --- GDPR Endpoints ---

  @Query(() => GraphQLJSON, { name: 'exportMyData', description: 'Export all personal data (GDPR Art. 20 - Right to Data Portability).' })
  @UseGuards(JwtAuthGuard)
  async exportMyData(@CurrentUser() user: User): Promise<Record<string, unknown>> {
    return this.usersService.exportUserData(user.id);
  }

  @Mutation(() => Boolean, { description: 'Permanently delete your account and all associated data (GDPR Art. 17 - Right to Erasure).' })
  @UseGuards(JwtAuthGuard)
  async deleteMyAccount(@CurrentUser() user: User): Promise<boolean> {
    return this.usersService.deleteAccount(user.id);
  }

  @Mutation(() => User, { description: 'Update the authenticated user\'s language and country preference.' })
  @UseGuards(JwtAuthGuard)
  async updateLanguagePreference(
    @Args('languageCode') languageCode: string,
    @Args('countryCode', { nullable: true }) countryCode: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateLanguagePreference(user.id, languageCode, countryCode);
  }

  @Mutation(() => User, { description: 'Record cookie / analytics consent decision for the authenticated user.' })
  @UseGuards(JwtAuthGuard)
  async updateCookieConsent(
    @Args('accepted') accepted: boolean,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateCookieConsent(user.id, accepted);
  }

  @Mutation(() => User, { description: 'Update marketing communication preferences.' })
  @UseGuards(JwtAuthGuard)
  async updateMarketingPreferences(
    @Args('marketingEmails') marketingEmails: boolean,
    @Args('smsNotifications') smsNotifications: boolean,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateMarketingPreferences(user.id, marketingEmails, smsNotifications);
  }

  @Mutation(() => User, { description: "Update the current user's basic profile (name, phone)." })
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @Args('firstName', { nullable: true }) firstName: string | undefined,
    @Args('lastName', { nullable: true }) lastName: string | undefined,
    @Args('phone', { nullable: true }) phone: string | undefined,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateProfile(user.id, { firstName, lastName, phone });
  }

  @Mutation(() => Boolean, { description: 'Change the current user\'s password (requires current password).' })
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Args('currentPassword') currentPassword: string,
    @Args('newPassword') newPassword: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.changePassword(user.id, currentPassword, newPassword);
  }
}