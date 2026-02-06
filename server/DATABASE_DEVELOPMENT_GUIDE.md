# CarMarket365 Database Development Guide

## 📋 Table of Contents
- [Database Rules & Best Practices](#database-rules--best-practices)
- [Safe Database Operations](#safe-database-operations)
- [Schema Changes & Migrations](#schema-changes--migrations)
- [Data Management Guidelines](#data-management-guidelines)
- [Security Considerations](#security-considerations)
- [Development Workflow](#development-workflow)
- [Emergency Procedures](#emergency-procedures)

---

## 🛡️ Database Rules & Best Practices

### **GOLDEN RULES - NEVER BREAK THESE:**

1. **🚫 NEVER edit production data directly**
2. **🚫 NEVER delete tables without backup**
3. **🚫 NEVER modify schema during server runtime**
4. **🚫 NEVER share database credentials in code**
5. **🚫 NEVER run untested queries on production**

### **ALWAYS DO THIS:**

1. **✅ ALWAYS backup before major changes**
2. **✅ ALWAYS test changes in development first**
3. **✅ ALWAYS use transactions for multi-step operations**
4. **✅ ALWAYS validate data before inserting**
5. **✅ ALWAYS use proper column names with quotes**

---

## 🔒 Safe Database Operations

### **Before Making ANY Changes:**

```sql
-- 1. CREATE BACKUP FIRST
pg_dump postgresql://postgres:password@localhost:5432/carmarket365 > backup_$(date +%Y%m%d_%H%M).sql

-- 2. TEST YOUR QUERY
EXPLAIN SELECT * FROM cars WHERE condition = 'NEW';

-- 3. COUNT AFFECTED ROWS
SELECT COUNT(*) FROM cars WHERE condition = 'USED';
```

### **Safe Data Modification Pattern:**

```sql
-- 1. Start transaction
BEGIN;

-- 2. Make changes
UPDATE cars SET price = price * 0.9 WHERE year < 2020;

-- 3. Verify results
SELECT make, model, year, price FROM cars WHERE year < 2020;

-- 4. If correct, commit. If wrong, rollback.
COMMIT;  -- or ROLLBACK;
```

---

## 📊 Schema Changes & Migrations

### **Column Addition Rules:**

```sql
-- ✅ CORRECT: Add nullable column first
ALTER TABLE cars ADD COLUMN "engineCapacity" DECIMAL(4,2);

-- ✅ Then update with default values
UPDATE cars SET "engineCapacity" = 2.0 WHERE "fuelType" = 'GASOLINE';

-- ✅ Finally add constraints if needed
ALTER TABLE cars ALTER COLUMN "engineCapacity" SET NOT NULL;
```

### **Column Removal Rules:**

```sql
-- ✅ STEP 1: Remove dependencies first
-- Check what references this column
SELECT 
    tc.table_schema, 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE kcu.column_name = 'old_column_name';

-- ✅ STEP 2: Drop constraints
ALTER TABLE cars DROP CONSTRAINT IF EXISTS constraint_name;

-- ✅ STEP 3: Drop column
ALTER TABLE cars DROP COLUMN "oldColumnName";
```

### **Enum Modification Rules:**

```sql
-- ✅ Adding enum values (PostgreSQL 12+)
ALTER TYPE cars_condition_enum ADD VALUE 'REFURBISHED';

-- ⚠️ Removing enum values (requires recreation)
-- 1. Create new enum
CREATE TYPE cars_condition_enum_new AS ENUM ('NEW', 'USED', 'CERTIFIED');

-- 2. Add temporary column
ALTER TABLE cars ADD COLUMN condition_new cars_condition_enum_new;

-- 3. Migrate data
UPDATE cars SET condition_new = condition::text::cars_condition_enum_new 
WHERE condition::text IN ('NEW', 'USED', 'CERTIFIED');

-- 4. Drop old column and enum
ALTER TABLE cars DROP COLUMN condition;
DROP TYPE cars_condition_enum;

-- 5. Rename new column and enum
ALTER TABLE cars RENAME COLUMN condition_new TO condition;
ALTER TYPE cars_condition_enum_new RENAME TO cars_condition_enum;
```

---

## 📝 Data Management Guidelines

### **Inserting Data Rules:**

```sql
-- ✅ CORRECT: Always specify columns
INSERT INTO users (email, password, "firstName", "lastName", role)
VALUES ('user@test.com', 'hashed_password', 'John', 'Doe', 'USER');

-- ❌ WRONG: Never use INSERT without column names
INSERT INTO users VALUES (...);  -- DON'T DO THIS

-- ✅ CORRECT: Use RETURNING to get generated IDs
INSERT INTO cars (make, model, year, price, "sellerId")
VALUES ('Toyota', 'Prius', 2023, 28000, '550e8400-e29b-41d4-a716-446655440002')
RETURNING id, "createdAt";
```

### **Updating Data Rules:**

```sql
-- ✅ CORRECT: Always use WHERE clause
UPDATE cars SET price = 25000 WHERE id = 'specific-uuid';

-- ❌ DANGEROUS: Never update without WHERE
UPDATE cars SET price = 25000;  -- Updates ALL cars!

-- ✅ CORRECT: Use LIMIT for safety
UPDATE cars SET "isFeatured" = true 
WHERE price > 40000 AND "isFeatured" = false
LIMIT 5;
```

### **Deleting Data Rules:**

```sql
-- ✅ SAFE: Use soft deletes when possible
UPDATE cars SET "isAvailable" = false, "deletedAt" = NOW() 
WHERE id = 'specific-uuid';

-- ⚠️ CAREFUL: Hard deletes with confirmation
SELECT COUNT(*) FROM cars WHERE year < 2010;  -- Check count first
-- DELETE FROM cars WHERE year < 2010;  -- Uncomment only if sure
```

---

## 🔐 Security Considerations

### **Password & Authentication:**

```sql
-- ✅ CORRECT: Hash passwords (use bcrypt in application)
-- Never store plain text passwords in database

-- ✅ CORRECT: Use environment variables for credentials
-- DATABASE_URL=postgresql://postgres:password@localhost:5432/carmarket365

-- ❌ WRONG: Never commit credentials to git
```

### **Data Validation:**

```sql
-- ✅ Add constraints for data integrity
ALTER TABLE cars ADD CONSTRAINT valid_year 
CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM NOW()) + 1);

ALTER TABLE cars ADD CONSTRAINT positive_price 
CHECK (price > 0);

ALTER TABLE users ADD CONSTRAINT valid_email 
CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$');
```

### **Row Level Security (for future):**

```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY user_own_data ON users 
FOR ALL TO authenticated_users 
USING (id = current_setting('app.current_user_id')::uuid);
```

---

## 🔄 Development Workflow

### **Daily Development Process:**

1. **Morning Setup:**
   ```bash
   # 1. Start database
   brew services start postgresql
   
   # 2. Check database status
   psql postgresql://postgres:password@localhost:5432/carmarket365 -c "\conninfo"
   
   # 3. Run any pending migrations
   npm run db:migrate  # (when migration system is added)
   ```

2. **During Development:**
   ```bash
   # Create feature branch
   git checkout -b feature/new-table-structure
   
   # Test schema changes locally
   psql postgresql://postgres:password@localhost:5432/carmarket365 < new_migration.sql
   
   # Verify with application
   npm run start:dev
   ```

3. **Before Committing:**
   ```bash
   # Export schema for documentation
   pg_dump --schema-only postgresql://postgres:password@localhost:5432/carmarket365 > schema.sql
   
   # Run tests
   npm test
   
   # Commit changes
   git add . && git commit -m "Add: new table structure for features"
   ```

### **Testing Database Changes:**

```sql
-- Create test data
INSERT INTO cars (make, model, year, price, "vehicleType", "fuelType", transmission, condition, location, "sellerId")
VALUES 
  ('TestBrand', 'TestModel', 2023, 1000, 'CAR', 'GASOLINE', 'MANUAL', 'NEW', 'Test Location', '550e8400-e29b-41d4-a716-446655440002');

-- Verify business logic
SELECT 
  make, 
  model, 
  price,
  CASE 
    WHEN price < 20000 THEN 'Budget'
    WHEN price BETWEEN 20000 AND 40000 THEN 'Mid-range'
    ELSE 'Luxury'
  END as price_category
FROM cars WHERE make = 'TestBrand';

-- Clean up test data
DELETE FROM cars WHERE make = 'TestBrand';
```

---

## 🆘 Emergency Procedures

### **Database Recovery:**

```bash
# 1. Stop the application
kill -9 $(lsof -ti:3002)

# 2. Create emergency backup
pg_dump postgresql://postgres:password@localhost:5432/carmarket365 > emergency_backup_$(date +%Y%m%d_%H%M).sql

# 3. Restore from backup if needed
psql postgresql://postgres:password@localhost:5432/carmarket365 < backup_file.sql

# 4. Restart application
npm run start:dev
```

### **Corrupted Data Recovery:**

```sql
-- 1. Identify corrupted records
SELECT * FROM cars WHERE price IS NULL OR price < 0 OR year > 2030;

-- 2. Fix or remove corrupted data
UPDATE cars SET price = 1000 WHERE price <= 0;
DELETE FROM cars WHERE year > 2030;

-- 3. Verify data integrity
SELECT 
  COUNT(*) as total_cars,
  COUNT(CASE WHEN price > 0 THEN 1 END) as valid_prices,
  COUNT(CASE WHEN year BETWEEN 1900 AND 2024 THEN 1 END) as valid_years
FROM cars;
```

### **Schema Corruption Recovery:**

```bash
# 1. Export data only (no schema)
pg_dump --data-only postgresql://postgres:password@localhost:5432/carmarket365 > data_backup.sql

# 2. Recreate database
dropdb carmarket365
createdb carmarket365

# 3. Restore schema from TypeORM
npm run start:dev  # This will recreate schema

# 4. Import data
psql postgresql://postgres:password@localhost:5432/carmarket365 < data_backup.sql
```

---

## 📊 Monitoring & Maintenance

### **Daily Health Checks:**

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('carmarket365')) as database_size;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
  pg_stat_get_tuples_returned(c.oid) as rows_read,
  pg_stat_get_tuples_inserted(c.oid) as rows_inserted
FROM pg_tables pt
JOIN pg_class c ON c.relname = pt.tablename
WHERE schemaname = 'public';

-- Check for locks
SELECT 
  pg_stat_activity.pid,
  pg_stat_activity.query,
  pg_stat_activity.state,
  pg_stat_activity.wait_event_type,
  pg_stat_activity.wait_event
FROM pg_stat_activity 
WHERE pg_stat_activity.state = 'active';
```

### **Weekly Maintenance:**

```bash
# 1. Update table statistics
psql postgresql://postgres:password@localhost:5432/carmarket365 -c "ANALYZE;"

# 2. Clean up old data (if applicable)
psql postgresql://postgres:password@localhost:5432/carmarket365 -c "DELETE FROM car_views WHERE \"createdAt\" < NOW() - INTERVAL '90 days';"

# 3. Backup database
pg_dump postgresql://postgres:password@localhost:5432/carmarket365 > weekly_backup_$(date +%Y%m%d).sql

# 4. Check logs
tail -f /usr/local/var/log/postgresql/*.log
```

---

## 🚨 Common Mistakes & How to Avoid Them

### **1. Case Sensitivity Issues:**
```sql
-- ❌ WRONG: Will fail
SELECT firstName FROM users;

-- ✅ CORRECT: Use quotes for mixed case
SELECT "firstName" FROM users;
```

### **2. UUID Format Issues:**
```sql
-- ❌ WRONG: Invalid UUID format
INSERT INTO cars VALUES ('123', ...);

-- ✅ CORRECT: Let PostgreSQL generate UUID
INSERT INTO cars (make, model, ...) VALUES ('BMW', '3 Series', ...);

-- ✅ CORRECT: Use valid UUID if specifying
INSERT INTO cars (id, make, model, ...) VALUES ('550e8400-e29b-41d4-a716-446655440001', 'BMW', '3 Series', ...);
```

### **3. Foreign Key Violations:**
```sql
-- ❌ WRONG: Will fail if seller doesn't exist
INSERT INTO cars ("sellerId", make, model) VALUES ('nonexistent-id', 'BMW', 'X5');

-- ✅ CORRECT: Check foreign key exists first
SELECT id FROM users WHERE id = '550e8400-e29b-41d4-a716-446655440002';
INSERT INTO cars ("sellerId", make, model) VALUES ('550e8400-e29b-41d4-a716-446655440002', 'BMW', 'X5');
```

### **4. Enum Value Issues:**
```sql
-- Check valid enum values first
SELECT unnest(enum_range(NULL::cars_condition_enum));

-- ❌ WRONG: Invalid enum value
INSERT INTO cars (condition, ...) VALUES ('PERFECT', ...);

-- ✅ CORRECT: Use valid enum value
INSERT INTO cars (condition, ...) VALUES ('NEW', ...);
```

---

## 📚 Quick Reference

### **Essential Commands:**
```bash
# Connect to database
psql postgresql://postgres:password@localhost:5432/carmarket365

# Backup database
pg_dump postgresql://postgres:password@localhost:5432/carmarket365 > backup.sql

# Restore database
psql postgresql://postgres:password@localhost:5432/carmarket365 < backup.sql

# Check server status
npm run start:dev
```

### **Common Queries:**
```sql
-- Show all tables
\dt

-- Describe table structure
\d table_name

-- Show table data
SELECT * FROM table_name LIMIT 10;

-- Count records
SELECT COUNT(*) FROM table_name;

-- Show recent records
SELECT * FROM table_name ORDER BY "createdAt" DESC LIMIT 5;
```

---

**Remember: When in doubt, backup first and ask for help! 🛟**

**Last Updated:** $(date +%Y-%m-%d)  
**Version:** 1.0  
**Database:** CarMarket365 PostgreSQL