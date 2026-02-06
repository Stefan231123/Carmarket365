// ===============================================
// CARMARKET365 PROFESSIONAL ENTITIES
// TypeORM Entity Examples for Professional Tables
// ===============================================

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, ID, Int, Float, registerEnumType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Car } from '../cars/car.entity';

// ===============================================
// 1. MARKET ANALYTICS ENTITIES
// ===============================================

@ObjectType()
@Entity('market_price_analytics')
@Index(['make', 'model', 'year'])
@Index(['region', 'countryCode'])
@Index(['calculationDate'])
export class MarketPriceAnalytics {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  make: string;

  @Field()
  @Column()
  model: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  variant?: string;

  @Field(() => Int)
  @Column()
  year: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mileageRangeStart?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mileageRangeEnd?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fuelType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transmission?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  condition?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  countryCode?: string;

  // Price Analytics
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  currentAvgPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  currentMedianPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  currentMinPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  currentMaxPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  priceTrend7d?: number; // Percentage change

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  priceTrend30d?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  priceTrend90d?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  priceTrend1y?: number;

  // Market Volume
  @Field(() => Int)
  @Column({ default: 0 })
  activeListingsCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  soldCount7d: number;

  @Field(() => Int)
  @Column({ default: 0 })
  soldCount30d: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  averageDaysOnMarket?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  inventoryTurnoverRate?: number;

  // Demand Metrics
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  viewToInquiryRatio?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  inquiryToSaleRatio?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  priceReductionFrequency?: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column('date')
  calculationDate: Date;
}

export enum RecommendationType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  MAINTAIN = 'MAINTAIN',
  URGENT_REDUCE = 'URGENT_REDUCE',
}

export enum MarketPosition {
  ABOVE_MARKET = 'ABOVE_MARKET',
  BELOW_MARKET = 'BELOW_MARKET',
  COMPETITIVE = 'COMPETITIVE',
}

registerEnumType(RecommendationType, { name: 'RecommendationType' });
registerEnumType(MarketPosition, { name: 'MarketPosition' });

@ObjectType()
@Entity('pricing_recommendations')
@Index(['carId'])
@Index(['createdAt'])
export class PricingRecommendation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  carId: string;

  @Field(() => Car)
  @ManyToOne(() => Car, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  suggestedPrice: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  currentPrice: number;

  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2 })
  priceAdjustment: number; // Difference

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 5, scale: 4, nullable: true })
  confidenceScore?: number; // 0.0 to 1.0

  @Field(() => RecommendationType)
  @Column({
    type: 'enum',
    enum: RecommendationType,
  })
  recommendationType: RecommendationType;

  @Field(() => MarketPosition)
  @Column({
    type: 'enum',
    enum: MarketPosition,
  })
  marketPosition: MarketPosition;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  daysSinceListed?: number;

  @Field(() => Int)
  @Column({ default: 0 })
  viewCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  inquiryCount: number;

  // Market Context
  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  comparableCarsCount?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  marketAvgPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  marketMedianPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  fastestSellingPrice?: number;

  @Field()
  @Column('jsonb', { default: {} })
  reasoningFactors: any; // Structured reasoning data

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  expiresAt?: Date;
}

// ===============================================
// 2. DEALER PERFORMANCE ENTITIES
// ===============================================

export enum MetricPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

registerEnumType(MetricPeriod, { name: 'MetricPeriod' });

@ObjectType()
@Entity('dealer_performance_metrics')
@Index(['dealerId', 'metricPeriod', 'periodStart'])
@Index(['periodStart', 'periodEnd'])
export class DealerPerformanceMetrics {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dealerId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dealerId' })
  dealer: User;

  @Field(() => MetricPeriod)
  @Column({
    type: 'enum',
    enum: MetricPeriod,
  })
  metricPeriod: MetricPeriod;

  @Field()
  @Column('date')
  periodStart: Date;

  @Field()
  @Column('date')
  periodEnd: Date;

  // Sales Metrics
  @Field(() => Int)
  @Column({ default: 0 })
  totalListings: number;

  @Field(() => Int)
  @Column({ default: 0 })
  newListings: number;

  @Field(() => Int)
  @Column({ default: 0 })
  soldListings: number;

  @Field(() => Int)
  @Column({ default: 0 })
  expiredListings: number;

  @Field(() => Float)
  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  totalRevenue: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  avgSalePrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  medianSalePrice?: number;

  // Performance Metrics
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  conversionRate?: number; // Listings to sales ratio

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  avgDaysOnMarket?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  inventoryTurnover?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  priceRealizationRate?: number; // Final price vs asking price

  // Customer Engagement
  @Field(() => Int)
  @Column({ default: 0 })
  totalViews: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalInquiries: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalTestDrives: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  viewToInquiryRate?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  inquiryToSaleRate?: number;

  // Quality Metrics
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  listingQualityScore?: number; // Based on completeness, photos, description

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  responseTimeAvgHours?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  customerSatisfactionRating?: number; // 1.0 to 5.0

  @Field(() => Int)
  @Column({ default: 0 })
  repeatCustomerCount: number;

  // Market Position
  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 8, scale: 4, nullable: true })
  marketSharePercentage?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  priceCompetitivenessScore?: number; // 1-10 scale

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  rankInRegion?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  rankInCountry?: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

// ===============================================
// 3. SUBSCRIPTION MANAGEMENT ENTITIES
// ===============================================

export enum PlanType {
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
  CUSTOM = 'CUSTOM',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

registerEnumType(PlanType, { name: 'PlanType' });
registerEnumType(SubscriptionStatus, { name: 'SubscriptionStatus' });
registerEnumType(BillingCycle, { name: 'BillingCycle' });

@ObjectType()
@Entity('subscription_plans')
@Index(['planType'])
@Index(['isActive', 'isPublic'])
export class SubscriptionPlan {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field(() => PlanType)
  @Column({
    type: 'enum',
    enum: PlanType,
  })
  planType: PlanType;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  monthlyPrice?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  yearlyPrice?: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  setupFee: number;

  @Field()
  @Column({ length: 3, default: 'EUR' })
  currency: string;

  // Features & Limits
  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  maxApiCallsPerMonth?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  maxReportsPerMonth?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  maxCustomReports?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  maxDataExportRows?: number;

  @Field()
  @Column({ default: false })
  realTimeDataAccess: boolean;

  @Field(() => Int)
  @Column({ default: 1 })
  historicalDataYears: number;

  @Field()
  @Column('jsonb', { default: [] })
  featuresIncluded: string[]; // Array of feature codes

  @Field()
  @Column('jsonb', { default: [] })
  dataFeedsIncluded: string[]; // Array of data feed types

  @Field()
  @Column('jsonb', { default: {} })
  analyticsFeatures: any; // Available analytics features

  @Field()
  @Column({ default: 'BASIC' })
  supportLevel: string; // 'BASIC', 'PRIORITY', 'DEDICATED'

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: true })
  isPublic: boolean; // Whether shown to public

  @Field(() => [DataSubscription])
  @OneToMany(() => DataSubscription, subscription => subscription.plan)
  subscriptions: DataSubscription[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
@Entity('data_subscriptions')
@Index(['subscriberId'])
@Index(['status'])
@Index(['nextBillingDate'])
@Index(['currentPeriodStart', 'currentPeriodEnd'])
export class DataSubscription {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subscriberId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscriberId' })
  subscriber: User;

  @Column()
  planId: string;

  @Field(() => SubscriptionPlan)
  @ManyToOne(() => SubscriptionPlan)
  @JoinColumn({ name: 'planId' })
  plan: SubscriptionPlan;

  @Field(() => SubscriptionStatus)
  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
  })
  status: SubscriptionStatus;

  @Field(() => BillingCycle)
  @Column({
    type: 'enum',
    enum: BillingCycle,
  })
  billingCycle: BillingCycle;

  // Dates
  @Field()
  @Column()
  startedAt: Date;

  @Field()
  @Column('date')
  currentPeriodStart: Date;

  @Field()
  @Column('date')
  currentPeriodEnd: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  cancelledAt?: Date;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  trialStart?: Date;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  trialEnd?: Date;

  // Usage Tracking
  @Field(() => Int)
  @Column({ default: 0 })
  apiCallsUsedCurrentMonth: number;

  @Field(() => Int)
  @Column({ default: 0 })
  reportsGeneratedCurrentMonth: number;

  @Field(() => Int)
  @Column({ default: 0 })
  dataExportedRowsCurrentMonth: number;

  // Billing Information
  @Field(() => Float)
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  totalAmountPaid: number;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  lastPaymentDate?: Date;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  nextBillingDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  paymentMethod?: string; // 'CREDIT_CARD', 'BANK_TRANSFER', 'INVOICE'

  // Custom Terms (for enterprise)
  @Field()
  @Column('jsonb', { default: {} })
  customFeatures: any;

  @Field()
  @Column('jsonb', { default: {} })
  customLimits: any;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  contractEndDate?: Date;

  @Field(() => [ApiAccessToken])
  @OneToMany(() => ApiAccessToken, token => token.subscription)
  apiTokens: ApiAccessToken[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

// ===============================================
// 4. API ACCESS AND USAGE TRACKING
// ===============================================

@ObjectType()
@Entity('api_access_tokens')
@Index(['tokenHash'], { unique: true })
@Index(['userId'])
@Index(['isActive', 'expiresAt'])
export class ApiAccessToken {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tokenHash: string; // SHA-256 hash of actual token

  @Field()
  @Column()
  tokenName: string; // User-friendly name

  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  subscriptionId?: string;

  @Field(() => DataSubscription, { nullable: true })
  @ManyToOne(() => DataSubscription, { nullable: true })
  @JoinColumn({ name: 'subscriptionId' })
  subscription?: DataSubscription;

  @Field()
  @Column('jsonb')
  scopes: string[]; // Array of API scopes/permissions

  @Field(() => Int)
  @Column({ default: 60 })
  rateLimitPerMinute: number;

  @Field(() => Int)
  @Column({ default: 1000 })
  rateLimitPerHour: number;

  @Field(() => Int)
  @Column({ default: 10000 })
  rateLimitPerDay: number;

  // Usage Tracking
  @Field(() => Int)
  @Column({ default: 0 })
  totalRequests: number;

  @Field(() => Int)
  @Column({ default: 0 })
  requestsToday: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastUsedAt?: Date;

  @Field({ nullable: true })
  @Column('inet', { nullable: true })
  lastIpAddress?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  expiresAt?: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

// ===============================================
// EXAMPLE SERVICE CLASSES
// ===============================================

/*
@Injectable()
export class MarketAnalyticsService {
  constructor(
    @InjectRepository(MarketPriceAnalytics)
    private marketPriceRepository: Repository<MarketPriceAnalytics>,
    @InjectRepository(PricingRecommendation)
    private pricingRecommendationRepository: Repository<PricingRecommendation>,
  ) {}

  async calculateMarketPriceAnalytics(): Promise<void> {
    // Implement market analysis logic
    const analytics = await this.marketPriceRepository.query(`
      SELECT 
        make, model, year,
        AVG(price) as current_avg_price,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) as current_median_price,
        COUNT(*) as active_listings_count
      FROM cars 
      WHERE "isAvailable" = true 
      GROUP BY make, model, year
    `);

    for (const analytic of analytics) {
      await this.marketPriceRepository.save({
        make: analytic.make,
        model: analytic.model,
        year: analytic.year,
        currentAvgPrice: analytic.current_avg_price,
        currentMedianPrice: analytic.current_median_price,
        activeListingsCount: analytic.active_listings_count,
        calculationDate: new Date(),
      });
    }
  }

  async generatePricingRecommendations(carId: string): Promise<PricingRecommendation> {
    // Implement AI-powered pricing recommendation logic
    const car = await this.carRepository.findOne({ where: { id: carId } });
    
    // Calculate market position and suggested price
    const marketData = await this.getMarketData(car);
    const recommendation = this.calculateRecommendation(car, marketData);
    
    return await this.pricingRecommendationRepository.save(recommendation);
  }
}

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(DataSubscription)
    private subscriptionRepository: Repository<DataSubscription>,
    @InjectRepository(SubscriptionPlan)
    private planRepository: Repository<SubscriptionPlan>,
  ) {}

  async createSubscription(
    userId: string, 
    planId: string, 
    billingCycle: BillingCycle
  ): Promise<DataSubscription> {
    const plan = await this.planRepository.findOne({ where: { id: planId } });
    if (!plan) {
      throw new Error('Plan not found');
    }

    const subscription = this.subscriptionRepository.create({
      subscriberId: userId,
      planId: planId,
      status: SubscriptionStatus.ACTIVE,
      billingCycle: billingCycle,
      startedAt: new Date(),
      currentPeriodStart: new Date(),
      currentPeriodEnd: this.calculatePeriodEnd(billingCycle),
      nextBillingDate: this.calculatePeriodEnd(billingCycle),
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async checkUsageLimits(userId: string, feature: string): Promise<boolean> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { subscriberId: userId, status: SubscriptionStatus.ACTIVE },
      relations: ['plan'],
    });

    if (!subscription) {
      return false;
    }

    // Check specific usage limits based on feature
    switch (feature) {
      case 'api_call':
        return subscription.apiCallsUsedCurrentMonth < subscription.plan.maxApiCallsPerMonth;
      case 'report':
        return subscription.reportsGeneratedCurrentMonth < subscription.plan.maxReportsPerMonth;
      default:
        return true;
    }
  }
}
*/