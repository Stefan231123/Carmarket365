#!/bin/bash

# CarMarket365 Database Maintenance Script
# Run this weekly to keep your database healthy

DB_URL="${DATABASE_URL:-postgresql://postgres:password@localhost:5432/carmarket365}"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M)

echo "🛠️  CarMarket365 Database Maintenance"
echo "====================================="
echo "Started at: $(date)"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "1️⃣  Creating backup..."
pg_dump "$DB_URL" > "$BACKUP_DIR/maintenance_backup_$DATE.sql"
if [ $? -eq 0 ]; then
    echo "✅ Backup created: $BACKUP_DIR/maintenance_backup_$DATE.sql"
else
    echo "❌ Backup failed!"
    exit 1
fi

echo ""
echo "2️⃣  Running database validation..."
psql "$DB_URL" -f ./scripts/validate-database.sql

echo ""
echo "3️⃣  Updating table statistics..."
psql "$DB_URL" -c "ANALYZE;"
echo "✅ Statistics updated"

echo ""
echo "4️⃣  Cleaning old data (if applicable)..."
# Clean up old car views (older than 90 days)
DELETED_VIEWS=$(psql "$DB_URL" -t -c "
WITH deleted AS (
  DELETE FROM car_views 
  WHERE \"createdAt\" < NOW() - INTERVAL '90 days' 
  RETURNING id
) 
SELECT COUNT(*) FROM deleted;")

echo "✅ Cleaned up $DELETED_VIEWS old car views"

echo ""
echo "5️⃣  Checking disk space..."
echo "Database size:"
psql "$DB_URL" -c "SELECT pg_size_pretty(pg_database_size('carmarket365')) as database_size;"

echo "Table sizes:"
psql "$DB_URL" -c "
SELECT 
  tablename,
  pg_size_pretty(pg_total_relation_size('public.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size('public.'||tablename) DESC;"

echo ""
echo "6️⃣  Cleanup old backups (keep last 7 days)..."
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete
echo "✅ Old backups cleaned up"

echo ""
echo "🎉 Maintenance completed at: $(date)"
echo ""
echo "📊 Quick Stats:"
psql "$DB_URL" -c "
SELECT 
  'Users' as entity, COUNT(*) as total FROM users
UNION ALL
SELECT 
  'Cars' as entity, COUNT(*) as total FROM cars
UNION ALL  
SELECT 
  'Views (last 7 days)' as entity, COUNT(*) as total 
  FROM car_views WHERE \"createdAt\" > NOW() - INTERVAL '7 days';"

echo ""
echo "📝 Next steps:"
echo "- Check the validation output above for any issues"
echo "- Review database performance if needed"
echo "- Consider archiving old data if tables grow large"
echo ""