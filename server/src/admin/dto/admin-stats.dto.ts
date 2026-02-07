import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class AdminStats {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  totalDealers: number;

  @Field(() => Int)
  totalListings: number;

  @Field(() => Int)
  activeListings: number;

  @Field(() => Int)
  pendingListings: number;

  @Field(() => Int)
  flaggedListings: number;

  @Field(() => Float)
  totalRevenue: number;

  @Field(() => Int)
  newUsersThisMonth: number;

  @Field(() => Int)
  newUsersThisWeek: number;

  @Field(() => Int)
  totalViews: number;

  @Field(() => Int)
  totalInquiries: number;

  @Field(() => Float)
  averageListingPrice: number;
}

@ObjectType()
export class RecentActivity {
  @Field()
  id: string;

  @Field()
  action: string;

  @Field()
  user: string;

  @Field()
  time: string;

  @Field()
  details: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  entityId?: string;
}

@ObjectType()
export class SystemHealth {
  @Field()
  status: string;

  @Field(() => Float)
  cpuUsage: number;

  @Field(() => Float)
  memoryUsage: number;

  @Field(() => Int)
  activeConnections: number;

  @Field(() => Int)
  responseTime: number;

  @Field()
  lastUpdated: string;

  @Field(() => Float)
  diskUsage: number;

  @Field(() => Int)
  errorRate: number;
}

@ObjectType()
export class UserStats {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  activeUsers: number;

  @Field(() => Int)
  newUsersToday: number;

  @Field(() => Int)
  newUsersThisWeek: number;

  @Field(() => Int)
  newUsersThisMonth: number;

  @Field(() => Float)
  userGrowthRate: number;
}