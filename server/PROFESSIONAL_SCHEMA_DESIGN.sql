-- ===============================================
-- CARMARKET365 PROFESSIONAL DATABASE SCHEMA
-- For Data-Oriented Car Marketplace Intelligence
-- ===============================================

-- ===============================================
-- 1. MARKET ANALYTICS AND PRICING INTELLIGENCE
-- ===============================================

-- Market Price Analytics
CREATE TABLE market_price_analytics (
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
    calculation_date DATE NOT NULL,
    
    -- Indexes for fast querying
    INDEX idx_market_price_make_model_year (make, model, year),
    INDEX idx_market_price_region (region, country_code),
    INDEX idx_market_price_calc_date (calculation_date)
);

-- Pricing Recommendations
CREATE TABLE pricing_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    
    -- Recommendation Data
    suggested_price DECIMAL(12,2) NOT NULL,
    current_price DECIMAL(12,2) NOT NULL,
    price_adjustment DECIMAL(12,2) NOT NULL, -- Difference
    confidence_score DECIMAL(5,4), -- 0.0 to 1.0
    
    -- Reasoning
    recommendation_type VARCHAR(50), -- 'INCREASE', 'DECREASE', 'MAINTAIN', 'URGENT_REDUCE'
    market_position VARCHAR(50), -- 'ABOVE_MARKET', 'BELOW_MARKET', 'COMPETITIVE'
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
    expires_at TIMESTAMP, -- When recommendation expires
    
    INDEX idx_pricing_rec_car_id (car_id),
    INDEX idx_pricing_rec_created (created_at)
);

-- Market Trends
CREATE TABLE market_trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Trend Scope
    trend_type VARCHAR(50) NOT NULL, -- 'BRAND', 'SEGMENT', 'FUEL_TYPE', 'REGION'
    trend_category VARCHAR(100) NOT NULL, -- Value depends on trend_type
    region VARCHAR(100),
    country_code VARCHAR(3),
    
    -- Time Period
    trend_period VARCHAR(20) NOT NULL, -- 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Trend Data
    growth_rate DECIMAL(8,4), -- Percentage growth
    volume_change INTEGER, -- Change in number of listings
    price_trend DECIMAL(8,4), -- Average price change percentage
    demand_trend DECIMAL(8,4), -- Demand index change
    
    -- Supporting Metrics
    total_listings INTEGER,
    total_sales INTEGER,
    avg_time_to_sell DECIMAL(8,2),
    most_popular_models JSONB,
    emerging_features JSONB,
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_market_trends_type_category (trend_type, trend_category),
    INDEX idx_market_trends_period (period_start, period_end)
);

-- Competitive Intelligence
CREATE TABLE competitive_intelligence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Dealer Information
    dealer_id UUID REFERENCES users(id),
    competitor_dealer_id UUID REFERENCES users(id),
    
    -- Market Position
    market_share_percentage DECIMAL(8,4),
    price_competitiveness_score DECIMAL(8,4), -- How competitive their pricing is
    inventory_size INTEGER,
    avg_listing_price DECIMAL(12,2),
    premium_to_market DECIMAL(8,4), -- How much higher/lower than market avg
    
    -- Performance Metrics
    conversion_rate DECIMAL(8,4), -- Views to sales
    avg_days_to_sell DECIMAL(8,2),
    repeat_customer_rate DECIMAL(8,4),
    customer_satisfaction_score DECIMAL(3,2), -- 1.0 to 5.0
    
    -- Inventory Analysis
    most_common_makes JSONB,
    price_range_distribution JSONB,
    vehicle_type_distribution JSONB,
    unique_selling_points JSONB,
    
    analysis_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_comp_intel_dealer (dealer_id),
    INDEX idx_comp_intel_date (analysis_date)
);

-- ===============================================
-- 2. VEHICLE HISTORY AND DATA ENRICHMENT
-- ===============================================

-- Vehicle History Records
CREATE TABLE vehicle_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Vehicle Identification
    vin VARCHAR(17) UNIQUE NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    
    -- History Timeline
    history_type VARCHAR(50) NOT NULL, -- 'OWNERSHIP', 'ACCIDENT', 'SERVICE', 'RECALL', 'REGISTRATION'
    event_date DATE NOT NULL,
    event_description TEXT,
    
    -- Event Details
    previous_owner_type VARCHAR(50), -- 'PRIVATE', 'DEALER', 'LEASE', 'FLEET', 'RENTAL'
    mileage_at_event INTEGER,
    location VARCHAR(200),
    cost_amount DECIMAL(12,2),
    severity_level VARCHAR(20), -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    
    -- Documentation
    has_documentation BOOLEAN DEFAULT FALSE,
    document_urls JSONB, -- Array of document URLs
    verified_by_source VARCHAR(100), -- Data source that verified this
    
    -- Data Source
    data_source VARCHAR(100) NOT NULL, -- 'CARFAX', 'AUTOCHECK', 'DMV', 'INSURANCE', 'MANUAL'
    source_report_id VARCHAR(255),
    source_confidence DECIMAL(3,2), -- 0.0 to 1.0
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_vehicle_history_vin (vin),
    INDEX idx_vehicle_history_type_date (history_type, event_date),
    INDEX idx_vehicle_history_source (data_source)
);

-- Vehicle Valuations
CREATE TABLE vehicle_valuations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Vehicle Reference
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    vin VARCHAR(17),
    
    -- Valuation Source
    valuation_source VARCHAR(100) NOT NULL, -- 'KBB', 'EDMUNDS', 'NADA', 'INTERNAL', 'MARKET_ANALYSIS'
    valuation_type VARCHAR(50) NOT NULL, -- 'TRADE_IN', 'PRIVATE_PARTY', 'DEALER_RETAIL', 'WHOLESALE'
    
    -- Valuations
    base_value DECIMAL(12,2) NOT NULL,
    condition_adjusted_value DECIMAL(12,2),
    mileage_adjusted_value DECIMAL(12,2),
    feature_adjusted_value DECIMAL(12,2),
    market_adjusted_value DECIMAL(12,2),
    final_estimated_value DECIMAL(12,2) NOT NULL,
    
    -- Confidence and Range
    confidence_score DECIMAL(3,2), -- 0.0 to 1.0
    value_range_low DECIMAL(12,2),
    value_range_high DECIMAL(12,2),
    
    -- Adjustment Factors
    condition_factor DECIMAL(5,4), -- Multiplier
    mileage_factor DECIMAL(5,4),
    market_factor DECIMAL(5,4),
    regional_factor DECIMAL(5,4),
    
    valuation_date DATE NOT NULL,
    expires_at DATE, -- When valuation becomes stale
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_valuations_car_id (car_id),
    INDEX idx_valuations_vin (vin),
    INDEX idx_valuations_source_type (valuation_source, valuation_type),
    INDEX idx_valuations_date (valuation_date)
);

-- Data Enrichment Log
CREATE TABLE data_enrichment_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Target Information
    entity_type VARCHAR(50) NOT NULL, -- 'CAR', 'USER', 'DEALER'
    entity_id UUID NOT NULL,
    
    -- Enrichment Details
    enrichment_type VARCHAR(100) NOT NULL, -- 'VIN_DECODE', 'MARKET_VALUE', 'HISTORY_CHECK', 'PHOTO_ANALYSIS'
    data_source VARCHAR(100) NOT NULL,
    
    -- Process Information
    status VARCHAR(20) NOT NULL, -- 'PENDING', 'SUCCESS', 'FAILED', 'PARTIAL'
    fields_enriched JSONB, -- Array of field names that were updated
    new_data JSONB, -- The actual enriched data
    confidence_scores JSONB, -- Confidence for each enriched field
    
    -- Processing Metadata
    processing_time_ms INTEGER,
    api_cost DECIMAL(8,4), -- Cost of external API call if applicable
    error_message TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    INDEX idx_enrichment_entity (entity_type, entity_id),
    INDEX idx_enrichment_type (enrichment_type),
    INDEX idx_enrichment_status (status),
    INDEX idx_enrichment_created (created_at)
);

-- ===============================================
-- 3. DEALER PERFORMANCE METRICS
-- ===============================================

-- Dealer Performance Dashboard
CREATE TABLE dealer_performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Time Period
    metric_period VARCHAR(20) NOT NULL, -- 'DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'
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
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_dealer_perf_dealer_period (dealer_id, metric_period, period_start),
    INDEX idx_dealer_perf_period (period_start, period_end),
    UNIQUE(dealer_id, metric_period, period_start, period_end)
);

-- Dealer Rankings
CREATE TABLE dealer_rankings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ranking Context
    ranking_type VARCHAR(50) NOT NULL, -- 'SALES_VOLUME', 'CUSTOMER_SATISFACTION', 'RESPONSE_TIME', 'PRICE_COMPETITIVE'
    ranking_scope VARCHAR(50) NOT NULL, -- 'NATIONAL', 'REGIONAL', 'CITY'
    scope_value VARCHAR(100), -- Region/city name if applicable
    
    -- Time Period
    ranking_period VARCHAR(20) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Ranking Data
    dealer_id UUID NOT NULL REFERENCES users(id),
    rank_position INTEGER NOT NULL,
    total_participants INTEGER NOT NULL,
    percentile DECIMAL(5,2), -- 0-100 percentile
    score DECIMAL(10,4), -- The actual score used for ranking
    
    -- Performance Context
    previous_rank INTEGER,
    rank_change INTEGER, -- Change from previous period
    tier VARCHAR(20), -- 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'BASIC'
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_dealer_rankings_type_scope (ranking_type, ranking_scope),
    INDEX idx_dealer_rankings_dealer (dealer_id),
    INDEX idx_dealer_rankings_period (period_start, period_end),
    INDEX idx_dealer_rankings_rank (rank_position)
);

-- Performance Insights
CREATE TABLE performance_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Insight Details
    insight_type VARCHAR(100) NOT NULL, -- 'PRICING_OPPORTUNITY', 'INVENTORY_GAP', 'MARKET_TREND', 'OPERATIONAL_EFFICIENCY'
    insight_category VARCHAR(50) NOT NULL, -- 'REVENUE', 'EFFICIENCY', 'MARKET', 'CUSTOMER'
    priority_level VARCHAR(20) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    
    -- Insight Content
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    recommendation TEXT,
    
    -- Impact Analysis
    potential_revenue_impact DECIMAL(12,2),
    potential_efficiency_gain DECIMAL(8,4),
    implementation_difficulty VARCHAR(20), -- 'EASY', 'MEDIUM', 'HARD'
    estimated_time_to_implement INTEGER, -- Days
    
    -- Supporting Data
    supporting_metrics JSONB,
    trend_data JSONB,
    benchmarks JSONB,
    
    -- Status
    status VARCHAR(20) DEFAULT 'NEW', -- 'NEW', 'VIEWED', 'DISMISSED', 'IMPLEMENTING', 'COMPLETED'
    viewed_at TIMESTAMP,
    dismissed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP, -- When insight becomes irrelevant
    
    INDEX idx_insights_dealer (dealer_id),
    INDEX idx_insights_type_priority (insight_type, priority_level),
    INDEX idx_insights_status (status),
    INDEX idx_insights_created (created_at)
);

-- ===============================================
-- 4. BUSINESS INTELLIGENCE AND REPORTING
-- ===============================================

-- Custom Reports
CREATE TABLE custom_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Report Metadata
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- 'SALES', 'INVENTORY', 'MARKET', 'FINANCIAL', 'OPERATIONAL'
    
    -- Access Control
    created_by UUID NOT NULL REFERENCES users(id),
    visibility VARCHAR(20) DEFAULT 'PRIVATE', -- 'PRIVATE', 'DEALER', 'PUBLIC'
    allowed_user_ids JSONB, -- Array of user IDs with access
    
    -- Report Configuration
    report_config JSONB NOT NULL, -- Complete report configuration
    filters JSONB, -- Default filters
    grouping_fields JSONB, -- Fields to group by
    sorting_config JSONB, -- Sorting configuration
    chart_config JSONB, -- Chart/visualization configuration
    
    -- Scheduling
    is_scheduled BOOLEAN DEFAULT FALSE,
    schedule_frequency VARCHAR(20), -- 'DAILY', 'WEEKLY', 'MONTHLY'
    schedule_time TIME,
    schedule_days JSONB, -- Array of days for weekly schedules
    last_generated TIMESTAMP,
    next_generation TIMESTAMP,
    
    -- Usage Stats
    run_count INTEGER DEFAULT 0,
    last_run TIMESTAMP,
    avg_execution_time_ms INTEGER,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_custom_reports_created_by (created_by),
    INDEX idx_custom_reports_category (category),
    INDEX idx_custom_reports_scheduled (is_scheduled, next_generation)
);

-- Report Executions
CREATE TABLE report_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES custom_reports(id) ON DELETE CASCADE,
    
    -- Execution Details
    executed_by UUID REFERENCES users(id),
    execution_type VARCHAR(20) NOT NULL, -- 'MANUAL', 'SCHEDULED', 'API'
    
    -- Parameters
    filter_overrides JSONB, -- Any filter changes for this execution
    date_range JSONB, -- Specific date range used
    
    -- Results
    status VARCHAR(20) NOT NULL, -- 'PENDING', 'RUNNING', 'COMPLETED', 'FAILED'
    result_data JSONB, -- The actual report data (for smaller reports)
    result_file_url VARCHAR(500), -- URL to stored result file for larger reports
    result_format VARCHAR(20), -- 'JSON', 'CSV', 'PDF', 'EXCEL'
    
    -- Performance
    execution_time_ms INTEGER,
    data_points_returned INTEGER,
    file_size_bytes INTEGER,
    
    -- Error Handling
    error_message TEXT,
    error_details JSONB,
    
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    INDEX idx_report_executions_report_id (report_id),
    INDEX idx_report_executions_executed_by (executed_by),
    INDEX idx_report_executions_status (status),
    INDEX idx_report_executions_started (started_at)
);

-- Market Forecasts
CREATE TABLE market_forecasts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Forecast Scope
    forecast_type VARCHAR(50) NOT NULL, -- 'PRICE', 'DEMAND', 'SUPPLY', 'TREND'
    market_segment VARCHAR(100), -- 'LUXURY_CARS', 'ECONOMY_CARS', 'ELECTRIC_VEHICLES', etc.
    geographic_scope VARCHAR(100), -- 'NATIONAL', 'SKOPJE', 'OHRID', etc.
    
    -- Time Horizon
    forecast_period VARCHAR(20) NOT NULL, -- '1_MONTH', '3_MONTHS', '6_MONTHS', '1_YEAR'
    forecast_date DATE NOT NULL, -- When forecast was generated
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    
    -- Forecast Data
    predicted_values JSONB NOT NULL, -- Time series of predicted values
    confidence_intervals JSONB, -- Upper and lower bounds for predictions
    
    -- Model Information
    model_type VARCHAR(50) NOT NULL, -- 'LINEAR_REGRESSION', 'ARIMA', 'NEURAL_NETWORK', 'ENSEMBLE'
    model_version VARCHAR(20),
    training_data_period JSONB, -- What historical data was used
    model_accuracy DECIMAL(5,4), -- 0.0 to 1.0
    
    -- Forecast Factors
    key_factors JSONB, -- What factors drive this forecast
    assumptions JSONB, -- Key assumptions made
    risk_factors JSONB, -- What could make forecast wrong
    
    -- Validation
    actual_values JSONB, -- Actual values as they become available
    forecast_accuracy DECIMAL(5,4), -- How accurate the forecast was
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_market_forecasts_type_segment (forecast_type, market_segment),
    INDEX idx_market_forecasts_scope_period (geographic_scope, forecast_period),
    INDEX idx_market_forecasts_date (forecast_date),
    INDEX idx_market_forecasts_valid (valid_from, valid_to)
);

-- ===============================================
-- 5. PROFESSIONAL DATA FEEDS AND SUBSCRIPTIONS
-- ===============================================

-- Subscription Plans
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Plan Details
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    plan_type VARCHAR(50) NOT NULL, -- 'BASIC', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM'
    
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
    features_included JSONB, -- Array of feature codes
    data_feeds_included JSONB, -- Array of data feed types
    analytics_features JSONB, -- Available analytics features
    support_level VARCHAR(50), -- 'BASIC', 'PRIORITY', 'DEDICATED'
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_public BOOLEAN DEFAULT TRUE, -- Whether shown to public
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_subscription_plans_type (plan_type),
    INDEX idx_subscription_plans_active (is_active, is_public)
);

-- Data Subscriptions
CREATE TABLE data_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscriber_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Subscription Status
    status VARCHAR(20) NOT NULL, -- 'ACTIVE', 'SUSPENDED', 'CANCELLED', 'EXPIRED', 'TRIAL'
    billing_cycle VARCHAR(20) NOT NULL, -- 'MONTHLY', 'YEARLY'
    
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
    custom_features JSONB,
    custom_limits JSONB,
    contract_end_date DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_data_subscriptions_subscriber (subscriber_id),
    INDEX idx_data_subscriptions_status (status),
    INDEX idx_data_subscriptions_billing (next_billing_date),
    INDEX idx_data_subscriptions_period (current_period_start, current_period_end)
);

-- API Access Tokens
CREATE TABLE api_access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Token Details
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256 hash of actual token
    token_name VARCHAR(100) NOT NULL, -- User-friendly name
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES data_subscriptions(id),
    
    -- Access Control
    scopes JSONB NOT NULL, -- Array of API scopes/permissions
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
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_api_tokens_hash (token_hash),
    INDEX idx_api_tokens_user (user_id),
    INDEX idx_api_tokens_active (is_active, expires_at)
);

-- Data Feed Configurations
CREATE TABLE data_feed_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Feed Details
    feed_name VARCHAR(100) NOT NULL,
    feed_type VARCHAR(50) NOT NULL, -- 'MARKET_PRICES', 'VEHICLE_HISTORY', 'DEALER_PERFORMANCE', 'FORECASTS'
    description TEXT,
    
    -- Data Source
    source_system VARCHAR(100) NOT NULL,
    source_endpoint VARCHAR(500),
    update_frequency VARCHAR(50) NOT NULL, -- 'REAL_TIME', 'HOURLY', 'DAILY', 'WEEKLY'
    
    -- Configuration
    data_schema JSONB NOT NULL, -- Schema definition for the data
    filters JSONB, -- Default filters applied
    transformations JSONB, -- Data transformation rules
    
    -- Quality & Validation
    quality_rules JSONB, -- Data quality validation rules
    required_confidence_threshold DECIMAL(3,2), -- Minimum confidence for inclusion
    
    -- Access Control
    required_subscription_level VARCHAR(50), -- Minimum subscription level needed
    additional_cost_per_call DECIMAL(8,4) DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP DEFAULT NOW(),
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_data_feed_configs_type (feed_type),
    INDEX idx_data_feed_configs_active (is_active)
);

-- API Usage Logs
CREATE TABLE api_usage_logs (
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
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_api_usage_token (token_id),
    INDEX idx_api_usage_user (user_id),
    INDEX idx_api_usage_endpoint (endpoint),
    INDEX idx_api_usage_created (created_at),
    INDEX idx_api_usage_status (response_status)
);

-- ===============================================
-- 6. AUDIT TRAILS AND CHANGE TRACKING
-- ===============================================

-- Data Audit Trail
CREATE TABLE data_audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Entity Information
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    operation VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    
    -- Change Details
    old_values JSONB, -- Previous values (for UPDATE/DELETE)
    new_values JSONB, -- New values (for INSERT/UPDATE)
    changed_fields JSONB, -- Array of field names that changed
    
    -- Context
    changed_by UUID REFERENCES users(id),
    change_reason VARCHAR(200),
    ip_address INET,
    user_agent TEXT,
    api_endpoint VARCHAR(200), -- If changed via API
    
    -- Data Quality Impact
    quality_score_before DECIMAL(5,4),
    quality_score_after DECIMAL(5,4),
    validation_errors JSONB, -- Any validation issues
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_audit_trail_table_record (table_name, record_id),
    INDEX idx_audit_trail_changed_by (changed_by),
    INDEX idx_audit_trail_created (created_at),
    INDEX idx_audit_trail_operation (operation)
);

-- ===============================================
-- VIEWS FOR COMMON BUSINESS QUERIES
-- ===============================================

-- Current Market Position View
CREATE VIEW dealer_market_position AS
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
    COUNT(c.id) * 100.0 / (SELECT COUNT(*) FROM cars WHERE "isAvailable" = true) as market_share_percentage

FROM users d
LEFT JOIN cars c ON d.id = c."sellerId" AND c."isAvailable" = true
WHERE d.role = 'DEALER' AND d."dealerStatus" = 'APPROVED'
GROUP BY d.id, d."dealerName", d."dealerCity", d."dealerRegion";

-- Market Trends Summary View
CREATE VIEW market_trends_summary AS
SELECT 
    make,
    model,
    year,
    COUNT(*) as active_listings,
    AVG(price) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) as median_price,
    
    -- Price trends (comparing to 30 days ago)
    AVG(price) - LAG(AVG(price), 1) OVER (PARTITION BY make, model, year ORDER BY DATE_TRUNC('week', "createdAt")) as weekly_price_change,
    
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
-- FUNCTIONS FOR BUSINESS LOGIC
-- ===============================================

-- Function to calculate price recommendation
CREATE OR REPLACE FUNCTION calculate_price_recommendation(input_car_id UUID)
RETURNS TABLE (
    suggested_price DECIMAL(12,2),
    confidence_score DECIMAL(5,4),
    market_position VARCHAR(50),
    reasoning JSONB
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
    
    -- Calculate market averages for similar vehicles
    SELECT 
        AVG(price), 
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price),
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
    car_age_days := EXTRACT(DAY FROM NOW() - car_record."createdAt");
    
    IF car_record."viewCount" > 0 THEN
        view_inquiry_ratio := car_record."inquiryCount"::DECIMAL / car_record."viewCount";
    ELSE
        view_inquiry_ratio := 0;
    END IF;
    
    -- Return recommendation logic
    RETURN QUERY SELECT 
        CASE 
            WHEN car_age_days > 45 AND car_record.price > market_avg * 1.1 THEN market_avg * 0.95
            WHEN view_inquiry_ratio < 0.02 AND car_record.price > market_median THEN market_median * 0.98
            WHEN comparable_count > 5 AND car_record.price > market_avg * 1.05 THEN market_avg
            ELSE car_record.price
        END,
        CASE 
            WHEN comparable_count >= 10 THEN 0.9
            WHEN comparable_count >= 5 THEN 0.7
            ELSE 0.5
        END,
        CASE 
            WHEN car_record.price > market_avg * 1.1 THEN 'ABOVE_MARKET'
            WHEN car_record.price < market_avg * 0.9 THEN 'BELOW_MARKET'
            ELSE 'COMPETITIVE'
        END,
        json_build_object(
            'market_avg', market_avg,
            'market_median', market_median,
            'comparable_count', comparable_count,
            'car_age_days', car_age_days,
            'view_inquiry_ratio', view_inquiry_ratio,
            'recommendation_factors', ARRAY[
                CASE WHEN car_age_days > 45 THEN 'Long time on market' END,
                CASE WHEN view_inquiry_ratio < 0.02 THEN 'Low inquiry rate' END,
                CASE WHEN car_record.price > market_avg * 1.1 THEN 'Above market average' END
            ]
        )::JSONB;
END;
$$ LANGUAGE plpgsql;

-- ===============================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ===============================================

-- Additional composite indexes for complex queries
CREATE INDEX idx_cars_make_model_year_price ON cars (make, model, year, price);
CREATE INDEX idx_cars_location_price_available ON cars (location, price, "isAvailable");
CREATE INDEX idx_cars_seller_created ON cars ("sellerId", "createdAt");
CREATE INDEX idx_cars_price_range ON cars (price) WHERE "isAvailable" = true;

-- Indexes for analytics queries
CREATE INDEX idx_car_views_created_weekly ON car_views (DATE_TRUNC('week', "createdAt"));
CREATE INDEX idx_cars_sold_monthly ON cars (DATE_TRUNC('month', "soldAt")) WHERE "soldAt" IS NOT NULL;

-- ===============================================
-- INITIAL DATA AND CONFIGURATION
-- ===============================================

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, plan_type, monthly_price, yearly_price, features_included) VALUES
('Basic Analytics', 'Essential market data and basic reporting', 'BASIC', 99.00, 990.00, '["basic_market_data", "monthly_reports", "price_alerts"]'::jsonb),
('Professional Intelligence', 'Advanced analytics and competitive intelligence', 'PROFESSIONAL', 299.00, 2990.00, '["advanced_analytics", "competitor_tracking", "custom_reports", "api_access"]'::jsonb),
('Enterprise Solution', 'Complete data platform with custom integrations', 'ENTERPRISE', 999.00, 9990.00, '["everything", "custom_integrations", "dedicated_support", "white_label"]'::jsonb);

-- Insert default data feed configurations
INSERT INTO data_feed_configs (feed_name, feed_type, description, source_system, update_frequency, data_schema, required_subscription_level) VALUES
('Market Price Feed', 'MARKET_PRICES', 'Real-time market pricing data for all vehicle segments', 'INTERNAL_ANALYTICS', 'HOURLY', '{"fields": ["make", "model", "year", "avg_price", "median_price", "trend"]}'::jsonb, 'BASIC'),
('Vehicle History Feed', 'VEHICLE_HISTORY', 'Comprehensive vehicle history reports', 'CARFAX_INTEGRATION', 'REAL_TIME', '{"fields": ["vin", "history_events", "accidents", "service_records"]}'::jsonb, 'PROFESSIONAL'),
('Dealer Performance Feed', 'DEALER_PERFORMANCE', 'Detailed dealer performance metrics and benchmarks', 'INTERNAL_ANALYTICS', 'DAILY', '{"fields": ["dealer_id", "sales_metrics", "rankings", "market_share"]}'::jsonb, 'PROFESSIONAL'),
('Market Forecasts Feed', 'FORECASTS', 'AI-powered market forecasts and predictions', 'ML_ENGINE', 'WEEKLY', '{"fields": ["forecast_type", "predictions", "confidence_intervals"]}'::jsonb, 'ENTERPRISE');

-- ===============================================
-- END OF SCHEMA DESIGN
-- ===============================================