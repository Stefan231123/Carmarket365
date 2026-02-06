-- CarMarket365 Database Validation Script
-- Run this regularly to ensure database health

\echo '🏥 CarMarket365 Database Health Check'
\echo '=====================================\n'

-- Check database connection
\conninfo

\echo '\n📊 Table Record Counts:'
SELECT 
  'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 
  'cars' as table_name, COUNT(*) as record_count FROM cars
UNION ALL
SELECT 
  'car_images' as table_name, COUNT(*) as record_count FROM car_images
UNION ALL
SELECT 
  'car_views' as table_name, COUNT(*) as record_count FROM car_views
UNION ALL
SELECT 
  'car_inquiries' as table_name, COUNT(*) as record_count FROM car_inquiries
UNION ALL
SELECT 
  'saved_cars' as table_name, COUNT(*) as record_count FROM saved_cars
UNION ALL
SELECT 
  'search_alerts' as table_name, COUNT(*) as record_count FROM search_alerts;

\echo '\n🔍 Data Integrity Checks:'

-- Check for cars without sellers
SELECT 
  'Cars with missing sellers' as check_name,
  COUNT(*) as issues_found
FROM cars c 
LEFT JOIN users u ON c."sellerId" = u.id 
WHERE u.id IS NULL;

-- Check for invalid prices
SELECT 
  'Cars with invalid prices' as check_name,
  COUNT(*) as issues_found
FROM cars 
WHERE price <= 0 OR price IS NULL;

-- Check for invalid years
SELECT 
  'Cars with invalid years' as check_name,
  COUNT(*) as issues_found
FROM cars 
WHERE year < 1900 OR year > EXTRACT(YEAR FROM NOW()) + 2;

-- Check for duplicate emails
SELECT 
  'Users with duplicate emails' as check_name,
  COUNT(*) - COUNT(DISTINCT email) as issues_found
FROM users;

-- Check for orphaned car images
SELECT 
  'Orphaned car images' as check_name,
  COUNT(*) as issues_found
FROM car_images ci 
LEFT JOIN cars c ON ci."carId" = c.id 
WHERE c.id IS NULL;

\echo '\n📈 Database Size Information:'
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as table_size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

\echo '\n🕐 Recent Activity:'
SELECT 
  'Recent cars added' as activity,
  COUNT(*) as count
FROM cars 
WHERE "createdAt" > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  'Recent users registered' as activity,
  COUNT(*) as count
FROM users 
WHERE "createdAt" > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  'Recent inquiries' as activity,
  COUNT(*) as count
FROM car_inquiries 
WHERE "createdAt" > NOW() - INTERVAL '7 days';

\echo '\n✅ Validation Complete!'
\echo 'If you see any issues_found > 0, investigate immediately.'
\echo 'For help, check DATABASE_DEVELOPMENT_GUIDE.md';