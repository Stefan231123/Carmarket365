-- ===============================================
-- CARMARKET365 PROFESSIONAL MIGRATION SCRIPT
-- Phase 1: Core Professional Tables
-- ===============================================

-- This migration adds the core professional tables needed for
-- transforming CarMarket365 into a data intelligence platform

BEGIN;

-- ===============================================
-- 1. MARKET PRICE ANALYTICS TABLE
-- ===============================================

CREATE TABLE IF NOT EXISTS market_price_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    variant VARCHAR(100),
    year INTEGER NOT NULL,
    mileage_range_start INTEGER,
    mileage_range_end INTEGER,
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    condition VARCHAR(50),
    region VARCHAR(100),
    country_code VARCHAR(3),
    
    -- Price Analytics
    current_avg_price DECIMAL(12,2),
    current_median_price DECIMAL(12,2),
    current_min_price DECIMAL(12,2),
    current_max_price DECIMAL(12,2),
    price_trend_7d DECIMAL(8,2), -- Percentage change
    price_trend_30d DECIMAL(8,2),
    price_trend_90d DECIMAL(8,2),
    price_trend_1y DECIMAL(8,2),
    
    -- Market Volume
    active_listings_count INTEGER DEFAULT 0,
    sold_count_7d INTEGER DEFAULT 0,
    sold_count_30d INTEGER DEFAULT 0,
    average_days_on_market DECIMAL(8,2),
    inventory_turnover_rate DECIMAL(8,4),
    
    -- Demand Metrics
    view_to_inquiry_ratio DECIMAL(8,4),
    inquiry_to_sale_ratio DECIMAL(8,4),
    price_reduction_frequency DECIMAL(8,4),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    calculation_date DATE NOT NULL
);

-- Create indexes for market_price_analytics
CREATE INDEX IF NOT EXISTS idx_market_price_make_model_year ON market_price_analytics (make, model, year);
CREATE INDEX IF NOT EXISTS idx_market_price_region ON market_price_analytics (region, country_code);
CREATE INDEX IF NOT EXISTS idx_market_price_calc_date ON market_price_analytics (calculation_date);

-- ===============================================
-- 2. PRICING RECOMMENDATIONS TABLE
-- ===============================================

-- Create enum types for pricing recommendations
DO $$ BEGIN
    CREATE TYPE recommendation_type AS ENUM ('INCREASE', 'DECREASE', 'MAINTAIN', 'URGENT_REDUCE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE market_position AS ENUM ('ABOVE_MARKET', 'BELOW_MARKET', 'COMPETITIVE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS pricing_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    
    -- Recommendation Data
    suggested_price DECIMAL(12,2) NOT NULL,
    current_price DECIMAL(12,2) NOT NULL,
    price_adjustment DECIMAL(12,2) NOT NULL, -- Difference
    confidence_score DECIMAL(5,4), -- 0.0 to 1.0
    
    -- Reasoning
    recommendation_type recommendation_type,
    market_position market_position,
    days_since_listed INTEGER,
    view_count INTEGER,
    inquiry_count INTEGER,
    
    -- Market Context
    comparable_cars_count INTEGER,
    market_avg_price DECIMAL(12,2),
    market_median_price DECIMAL(12,2),
    fastest_selling_price DECIMAL(12,2),
    
    reasoning_factors JSONB, -- Structured reasoning data
    
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP -- When recommendation expires
);

-- Create indexes for pricing_recommendations
CREATE INDEX IF NOT EXISTS idx_pricing_rec_car_id ON pricing_recommendations (car_id);
CREATE INDEX IF NOT EXISTS idx_pricing_rec_created ON pricing_recommendations (created_at);

-- ===============================================
-- 3. SUBSCRIPTION PLANS TABLE
-- ===============================================

-- Create enum types for subscriptions
DO $$ BEGIN
    CREATE TYPE plan_type AS ENUM ('BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Plan Details
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    plan_type plan_type NOT NULL,
    
    -- Pricing
    monthly_price DECIMAL(10,2),
    yearly_price DECIMAL(10,2),
    setup_fee DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'EUR',
    
    -- Features & Limits
    max_api_calls_per_month INTEGER,
    max_reports_per_month INTEGER,
    max_custom_reports INTEGER,
    max_data_export_rows INTEGER,
    real_time_data_access BOOLEAN DEFAULT FALSE,
    historical_data_years INTEGER DEFAULT 1,
    
    -- Access Features
    features_included JSONB DEFAULT '[]'::jsonb, -- Array of feature codes
    data_feeds_included JSONB DEFAULT '[]'::jsonb, -- Array of data feed types
    analytics_features JSONB DEFAULT '{}'::jsonb, -- Available analytics features
    support_level VARCHAR(50) DEFAULT 'BASIC', -- 'BASIC', 'PRIORITY', 'DEDICATED'
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT TRUE, -- Whether shown to public
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for subscription_plans
CREATE INDEX IF NOT EXISTS idx_subscription_plans_type ON subscription_plans (plan_type);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_active ON subscription_plans (is_active, is_public);

-- ===============================================
-- 4. DATA SUBSCRIPTIONS TABLE
-- ===============================================

-- Create enum types for subscriptions
DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'SUSPENDED', 'CANCELLED', 'EXPIRED', 'TRIAL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE billing_cycle AS ENUM ('MONTHLY', 'YEARLY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS data_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscriber_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Subscription Status
    status subscription_status NOT NULL,
    billing_cycle billing_cycle NOT NULL,
    
    -- Dates
    started_at TIMESTAMP NOT NULL,
    current_period_start DATE NOT NULL,
    current_period_end DATE NOT NULL,
    cancelled_at TIMESTAMP,
    trial_start DATE,
    trial_end DATE,
    
    -- Usage Tracking
    api_calls_used_current_month INTEGER DEFAULT 0,
    reports_generated_current_month INTEGER DEFAULT 0,
    data_exported_rows_current_month INTEGER DEFAULT 0,
    
    -- Billing Information
    total_amount_paid DECIMAL(12,2) DEFAULT 0,
    last_payment_date DATE,
    next_billing_date DATE,
    payment_method VARCHAR(50), -- 'CREDIT_CARD', 'BANK_TRANSFER', 'INVOICE'
    
    -- Custom Terms (for enterprise)
    custom_features JSONB DEFAULT '{}'::jsonb,
    custom_limits JSONB DEFAULT '{}'::jsonb,
    contract_end_date DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for data_subscriptions
CREATE INDEX IF NOT EXISTS idx_data_subscriptions_subscriber ON data_subscriptions (subscriber_id);
CREATE INDEX IF NOT EXISTS idx_data_subscriptions_status ON data_subscriptions (status);
CREATE INDEX IF NOT EXISTS idx_data_subscriptions_billing ON data_subscriptions (next_billing_date);
CREATE INDEX IF NOT EXISTS idx_data_subscriptions_period ON data_subscriptions (current_period_start, current_period_end);
CREATE UNIQUE INDEX IF NOT EXISTS idx_data_subscriptions_unique ON data_subscriptions (subscriber_id) WHERE status = 'ACTIVE';

-- ===============================================
-- 5. DEALER PERFORMANCE METRICS TABLE
-- ===============================================

-- Create enum type for metric periods
DO $$ BEGIN
    CREATE TYPE metric_period AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS dealer_performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Time Period
    metric_period metric_period NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Sales Metrics
    total_listings INTEGER DEFAULT 0,
    new_listings INTEGER DEFAULT 0,
    sold_listings INTEGER DEFAULT 0,
    expired_listings INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    avg_sale_price DECIMAL(12,2),
    median_sale_price DECIMAL(12,2),
    
    -- Performance Metrics
    conversion_rate DECIMAL(8,4), -- Listings to sales ratio
    avg_days_on_market DECIMAL(8,2),
    inventory_turnover DECIMAL(8,4),
    price_realization_rate DECIMAL(8,4), -- Final price vs asking price
    
    -- Customer Engagement
    total_views INTEGER DEFAULT 0,
    total_inquiries INTEGER DEFAULT 0,
    total_test_drives INTEGER DEFAULT 0,
    view_to_inquiry_rate DECIMAL(8,4),
    inquiry_to_sale_rate DECIMAL(8,4),
    
    -- Quality Metrics
    listing_quality_score DECIMAL(5,2), -- Based on completeness, photos, description
    response_time_avg_hours DECIMAL(8,2),
    customer_satisfaction_rating DECIMAL(3,2), -- 1.0 to 5.0
    repeat_customer_count INTEGER DEFAULT 0,
    
    -- Market Position
    market_share_percentage DECIMAL(8,4),
    price_competitiveness_score DECIMAL(5,2), -- 1-10 scale
    rank_in_region INTEGER,
    rank_in_country INTEGER,
    
    -- Additional Metrics
    premium_listings_count INTEGER DEFAULT 0,
    featured_listings_count INTEGER DEFAULT 0,
    trade_in_deals_count INTEGER DEFAULT 0,
    financing_facilitated_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for dealer_performance_metrics
CREATE INDEX IF NOT EXISTS idx_dealer_perf_dealer_period ON dealer_performance_metrics (dealer_id, metric_period, period_start);
CREATE INDEX IF NOT EXISTS idx_dealer_perf_period ON dealer_performance_metrics (period_start, period_end);
CREATE UNIQUE INDEX IF NOT EXISTS idx_dealer_perf_unique ON dealer_performance_metrics (dealer_id, metric_period, period_start, period_end);

-- ===============================================
-- 6. API ACCESS TOKENS TABLE
-- ===============================================

CREATE TABLE IF NOT EXISTS api_access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Token Details
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256 hash of actual token
    token_name VARCHAR(100) NOT NULL, -- User-friendly name
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES data_subscriptions(id),
    
    -- Access Control
    scopes JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of API scopes/permissions
    rate_limit_per_minute INTEGER DEFAULT 60,
    rate_limit_per_hour INTEGER DEFAULT 1000,
    rate_limit_per_day INTEGER DEFAULT 10000,
    
    -- Usage Tracking
    total_requests INTEGER DEFAULT 0,
    requests_today INTEGER DEFAULT 0,
    last_used_at TIMESTAMP,
    last_ip_address INET,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for api_access_tokens
CREATE INDEX IF NOT EXISTS idx_api_tokens_hash ON api_access_tokens (token_hash);
CREATE INDEX IF NOT EXISTS idx_api_tokens_user ON api_access_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_api_tokens_active ON api_access_tokens (is_active, expires_at);

-- ===============================================
-- 7. API USAGE LOGS TABLE
-- ===============================================

CREATE TABLE IF NOT EXISTS api_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Request Details
    token_id UUID REFERENCES api_access_tokens(id),
    user_id UUID REFERENCES users(id),
    endpoint VARCHAR(200) NOT NULL,
    http_method VARCHAR(10) NOT NULL,
    
    -- Request Context
    ip_address INET,
    user_agent TEXT,
    request_size_bytes INTEGER,
    request_parameters JSONB,
    
    -- Response Details
    response_status INTEGER NOT NULL,
    response_size_bytes INTEGER,
    response_time_ms INTEGER,
    data_points_returned INTEGER,
    
    -- Billing
    billable_units DECIMAL(10,4) DEFAULT 0, -- How much to charge for this request
    cost_amount DECIMAL(8,4) DEFAULT 0,
    
    -- Error Information
    error_code VARCHAR(50),
    error_message TEXT,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for api_usage_logs
CREATE INDEX IF NOT EXISTS idx_api_usage_token ON api_usage_logs (token_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_user ON api_usage_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_endpoint ON api_usage_logs (endpoint);
CREATE INDEX IF NOT EXISTS idx_api_usage_created ON api_usage_logs (created_at);
CREATE INDEX IF NOT EXISTS idx_api_usage_status ON api_usage_logs (response_status);

-- ===============================================
-- 8. ENHANCED INDEXES FOR EXISTING TABLES
-- ===============================================

-- Additional indexes for better analytics performance on existing tables
CREATE INDEX IF NOT EXISTS idx_cars_make_model_year_price ON cars (make, model, year, price);
CREATE INDEX IF NOT EXISTS idx_cars_location_price_available ON cars (location, price, "isAvailable");
CREATE INDEX IF NOT EXISTS idx_cars_seller_created ON cars ("sellerId", "createdAt");
CREATE INDEX IF NOT EXISTS idx_cars_price_range ON cars (price) WHERE "isAvailable" = true;
CREATE INDEX IF NOT EXISTS idx_cars_sold_date ON cars ("soldAt") WHERE "soldAt" IS NOT NULL;

-- Indexes for analytics queries on existing tables
CREATE INDEX IF NOT EXISTS idx_car_views_created_weekly ON car_views (DATE_TRUNC('week', "createdAt"));
CREATE INDEX IF NOT EXISTS idx_cars_sold_monthly ON cars (DATE_TRUNC('month', "soldAt")) WHERE "soldAt" IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_car_inquiries_created ON car_inquiries ("createdAt");
CREATE INDEX IF NOT EXISTS idx_users_dealer_status ON users (role, "dealerStatus") WHERE role = 'DEALER';

-- ===============================================
-- 9. INITIAL DATA SETUP
-- ===============================================

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, plan_type, monthly_price, yearly_price, features_included, max_api_calls_per_month, max_reports_per_month) VALUES
('Basic Analytics', 'Essential market data and basic reporting for small dealers', 'BASIC', 99.00, 990.00, '["basic_market_data", "monthly_reports", "price_alerts", "competitor_overview"]'::jsonb, 1000, 10),
('Professional Intelligence', 'Advanced analytics and competitive intelligence for growing dealerships', 'PROFESSIONAL', 299.00, 2990.00, '["advanced_analytics", "competitor_tracking", "custom_reports", "api_access", "pricing_recommendations", "performance_benchmarking"]'::jsonb, 10000, 50),
('Enterprise Solution', 'Complete data platform with custom integrations for large dealer groups', 'ENTERPRISE', 999.00, 9990.00, '["everything", "custom_integrations", "dedicated_support", "white_label", "predictive_analytics", "unlimited_reports"]'::jsonb, 100000, -1)
ON CONFLICT (name) DO NOTHING;

-- ===============================================
-- 10. USEFUL VIEWS FOR ANALYTICS
-- ===============================================

-- Create a view for current dealer market position
CREATE OR REPLACE VIEW dealer_market_position AS
SELECT 
    d.id as dealer_id,
    d."dealerName" as dealer_name,
    d."dealerCity" as city,
    d."dealerRegion" as region,
    
    -- Current Inventory
    COUNT(c.id) as total_active_listings,
    AVG(c.price) as avg_listing_price,
    MIN(c.price) as min_price,
    MAX(c.price) as max_price,
    
    -- Performance Metrics (last 30 days)
    COUNT(CASE WHEN c."soldAt" >= NOW() - INTERVAL '30 days' THEN 1 END) as cars_sold_30d,
    AVG(CASE WHEN c."soldAt" IS NOT NULL THEN c.price END) as avg_sold_price,
    AVG(CASE WHEN c."soldAt" IS NOT NULL THEN EXTRACT(DAY FROM c."soldAt" - c."createdAt") END) as avg_days_to_sell,
    
    -- Market Share (approximate)
    ROUND(COUNT(c.id) * 100.0 / NULLIF((SELECT COUNT(*) FROM cars WHERE "isAvailable" = true), 0), 4) as market_share_percentage

FROM users d
LEFT JOIN cars c ON d.id = c."sellerId" AND c."isAvailable" = true
WHERE d.role = 'DEALER' AND d."dealerStatus" = 'APPROVED'
GROUP BY d.id, d."dealerName", d."dealerCity", d."dealerRegion";

-- Create a view for market trends summary
CREATE OR REPLACE VIEW market_trends_summary AS
SELECT 
    make,
    model,
    year,
    COUNT(*) as active_listings,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) as median_price,
    
    -- Demand indicators
    AVG("viewCount") as avg_views_per_listing,
    AVG("inquiryCount") as avg_inquiries_per_listing,
    COUNT(CASE WHEN "soldAt" IS NOT NULL THEN 1 END) as total_sold,
    
    DATE_TRUNC('week', "createdAt") as week_period

FROM cars
WHERE "createdAt" >= NOW() - INTERVAL '12 weeks'
GROUP BY make, model, year, DATE_TRUNC('week', "createdAt")
ORDER BY make, model, year, week_period;

-- ===============================================
-- 11. FUNCTIONS FOR BUSINESS LOGIC
-- ===============================================

-- Function to calculate a simple pricing recommendation
CREATE OR REPLACE FUNCTION calculate_simple_price_recommendation(input_car_id UUID)
RETURNS TABLE (
    suggested_price DECIMAL(12,2),
    confidence_score DECIMAL(5,4),
    market_position VARCHAR(50),
    reasoning TEXT
) AS $$
DECLARE
    car_record RECORD;
    market_avg DECIMAL(12,2);
    market_median DECIMAL(12,2);
    comparable_count INTEGER;
    car_age_days INTEGER;
    view_inquiry_ratio DECIMAL(8,4);
BEGIN
    -- Get car details
    SELECT * INTO car_record FROM cars WHERE id = input_car_id;
    
    IF NOT FOUND THEN
        RETURN;
    END IF;
    
    -- Calculate market averages for similar vehicles
    SELECT 
        AVG(price)::DECIMAL(12,2), 
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price)::DECIMAL(12,2),
        COUNT(*)
    INTO market_avg, market_median, comparable_count
    FROM cars 
    WHERE make = car_record.make 
        AND model = car_record.model 
        AND year BETWEEN car_record.year - 2 AND car_record.year + 2
        AND mileage BETWEEN car_record.mileage - 20000 AND car_record.mileage + 20000
        AND "isAvailable" = true
        AND id != input_car_id;
    
    -- Calculate car age and performance metrics
    car_age_days := EXTRACT(DAY FROM NOW() - car_record."createdAt")::INTEGER;
    
    IF car_record."viewCount" > 0 THEN
        view_inquiry_ratio := car_record."inquiryCount"::DECIMAL / car_record."viewCount";
    ELSE
        view_inquiry_ratio := 0;
    END IF;
    
    -- Return recommendation logic
    RETURN QUERY SELECT 
        CASE 
            WHEN car_age_days > 45 AND car_record.price > COALESCE(market_avg, car_record.price) * 1.1 THEN COALESCE(market_avg, car_record.price) * 0.95
            WHEN view_inquiry_ratio < 0.02 AND car_record.price > COALESCE(market_median, car_record.price) THEN COALESCE(market_median, car_record.price) * 0.98
            WHEN comparable_count > 5 AND car_record.price > COALESCE(market_avg, car_record.price) * 1.05 THEN COALESCE(market_avg, car_record.price)
            ELSE car_record.price
        END,
        CASE 
            WHEN comparable_count >= 10 THEN 0.9::DECIMAL(5,4)
            WHEN comparable_count >= 5 THEN 0.7::DECIMAL(5,4)
            ELSE 0.5::DECIMAL(5,4)
        END,
        CASE 
            WHEN car_record.price > COALESCE(market_avg, car_record.price) * 1.1 THEN 'ABOVE_MARKET'
            WHEN car_record.price < COALESCE(market_avg, car_record.price) * 0.9 THEN 'BELOW_MARKET'
            ELSE 'COMPETITIVE'
        END,
        CASE 
            WHEN car_age_days > 45 THEN 'Long time on market, consider price reduction'
            WHEN view_inquiry_ratio < 0.02 THEN 'Low inquiry rate, price may be too high'
            WHEN car_record.price > COALESCE(market_avg, car_record.price) * 1.1 THEN 'Priced above market average'
            ELSE 'Competitive pricing'
        END;
END;
$$ LANGUAGE plpgsql;

-- ===============================================
-- 12. COMMIT TRANSACTION
-- ===============================================

COMMIT;

-- ===============================================
-- VERIFICATION QUERIES
-- ===============================================

-- Verify tables were created successfully
DO $$
DECLARE 
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN (
        'market_price_analytics',
        'pricing_recommendations', 
        'subscription_plans',
        'data_subscriptions',
        'dealer_performance_metrics',
        'api_access_tokens',
        'api_usage_logs'
    );
    
    RAISE NOTICE 'Created % professional tables successfully', table_count;
    
    IF table_count = 7 THEN
        RAISE NOTICE 'All professional tables created successfully!';
    ELSE
        RAISE WARNING 'Expected 7 tables but found %. Please check for errors.', table_count;
    END IF;
END $$;

-- Check subscription plans
SELECT COUNT(*) as plan_count FROM subscription_plans;

RAISE NOTICE 'Professional database schema migration completed successfully!';
RAISE NOTICE 'Next steps:';
RAISE NOTICE '1. Update your TypeORM entities to match the new schema';
RAISE NOTICE '2. Create services for market analytics and subscription management';
RAISE NOTICE '3. Implement API endpoints for professional features';
RAISE NOTICE '4. Set up scheduled jobs for analytics calculations';
RAISE NOTICE '5. Configure authentication and authorization for premium features';