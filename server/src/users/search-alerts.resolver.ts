import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SearchAlert, AlertFrequency } from './search-alert.entity';
import { SearchAlertsService, CreateSearchAlertData, UpdateSearchAlertData } from './search-alerts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './user.entity';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
class CreateSearchAlertInput {
  @Field()
  name: string;

  @Field(() => GraphQLJSON)
  filters: any;

  @Field(() => AlertFrequency)
  frequency: AlertFrequency;

  @Field({ defaultValue: true })
  isActive: boolean;
}

@InputType()
class UpdateSearchAlertInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  filters?: any;

  @Field(() => AlertFrequency, { nullable: true })
  frequency?: AlertFrequency;

  @Field({ nullable: true })
  isActive?: boolean;
}

@ObjectType()
class SearchAlertStats {
  @Field(() => Int)
  totalAlerts: number;

  @Field(() => Int)
  activeAlerts: number;
}

@Resolver(() => SearchAlert)
export class SearchAlertsResolver {
  constructor(private readonly searchAlertsService: SearchAlertsService) {}

  @Mutation(() => SearchAlert)
  @UseGuards(JwtAuthGuard)
  async createSearchAlert(
    @Args('input') createSearchAlertInput: CreateSearchAlertInput,
    @CurrentUser() user: User,
  ): Promise<SearchAlert> {
    const alertData: CreateSearchAlertData = {
      ...createSearchAlertInput,
      userId: user.id,
    };

    return this.searchAlertsService.create(alertData);
  }

  @Query(() => SearchAlert, { name: 'getSearchAlertById' })
  @UseGuards(JwtAuthGuard)
  async getSearchAlertById(@Args('id') id: string): Promise<SearchAlert> {
    return this.searchAlertsService.findById(id);
  }

  @Query(() => [SearchAlert], { name: 'getUserSearchAlerts' })
  @UseGuards(JwtAuthGuard)
  async getUserSearchAlerts(@CurrentUser() user: User): Promise<SearchAlert[]> {
    return this.searchAlertsService.findByUserId(user.id);
  }

  @Query(() => SearchAlertStats, { name: 'getSearchAlertStats' })
  @UseGuards(JwtAuthGuard)
  async getSearchAlertStats(@CurrentUser() user: User): Promise<SearchAlertStats> {
    const [totalAlerts, activeAlerts] = await Promise.all([
      this.searchAlertsService.getUserAlertCount(user.id),
      this.searchAlertsService.getUserActiveAlertCount(user.id),
    ]);

    return { totalAlerts, activeAlerts };
  }

  @Mutation(() => SearchAlert)
  @UseGuards(JwtAuthGuard)
  async updateSearchAlert(
    @Args('id') id: string,
    @Args('input') updateSearchAlertInput: UpdateSearchAlertInput,
    @CurrentUser() user: User,
  ): Promise<SearchAlert> {
    const updateData: UpdateSearchAlertData = updateSearchAlertInput;
    return this.searchAlertsService.update(id, updateData, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteSearchAlert(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.searchAlertsService.remove(id, user.id);
  }

  @Mutation(() => SearchAlert)
  @UseGuards(JwtAuthGuard)
  async toggleSearchAlert(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<SearchAlert> {
    return this.searchAlertsService.toggleActive(id, user.id);
  }

  @Query(() => [SearchAlert], { name: 'getActiveSearchAlerts' })
  @UseGuards(JwtAuthGuard)
  async getActiveSearchAlerts(): Promise<SearchAlert[]> {
    return this.searchAlertsService.findActiveAlerts();
  }

  @Query(() => [SearchAlert], { name: 'getAlertsByFrequency' })
  @UseGuards(JwtAuthGuard)
  async getAlertsByFrequency(
    @Args('frequency', { type: () => AlertFrequency }) frequency: AlertFrequency,
  ): Promise<SearchAlert[]> {
    return this.searchAlertsService.getAlertsByFrequency(frequency);
  }
}