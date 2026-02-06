# 🚀 CarMarket365 Database Quick Reference

## 🔌 Connection
```bash
psql postgresql://postgres:password@localhost:5432/carmarket365
```

## ⚡ Essential Commands
```sql
-- List tables
\dt

-- Table structure
\d users
\d cars

-- View data
SELECT * FROM cars LIMIT 5;
SELECT * FROM users WHERE role = 'DEALER';

-- Count records
SELECT COUNT(*) FROM cars;
```

## 🛡️ Safety Rules
1. **ALWAYS backup before changes:** `pg_dump ... > backup.sql`
2. **ALWAYS use transactions:** `BEGIN; ... COMMIT;`
3. **ALWAYS test queries first:** `SELECT COUNT(*) FROM ...`
4. **NEVER delete without WHERE:** Use `WHERE` clause
5. **Use quotes for mixed case:** `"firstName"` not `firstname`

## 📝 Safe Data Changes
```sql
-- Safe Insert
INSERT INTO cars (make, model, year, price, "sellerId")
VALUES ('Toyota', 'Camry', 2023, 25000, 'valid-uuid');

-- Safe Update
UPDATE cars SET price = 30000 WHERE id = 'specific-uuid';

-- Safe Delete (soft delete preferred)
UPDATE cars SET "isAvailable" = false WHERE id = 'specific-uuid';
```

## 🆘 Emergency Backup
```bash
# Quick backup
pg_dump postgresql://postgres:password@localhost:5432/carmarket365 > emergency_$(date +%H%M).sql

# Restore if needed
psql postgresql://postgres:password@localhost:5432/carmarket365 < emergency_backup.sql
```

## 📊 Current Tables
- `users` (3 records) - User accounts
- `cars` (6 records) - Vehicle listings  
- `car_images` (6 records) - Vehicle photos
- `car_views` (5 records) - Analytics data
- `car_inquiries` (2 records) - Customer inquiries
- `saved_cars` (2 records) - User favorites
- `search_alerts` (2 records) - Notifications

## 🔍 Valid Enum Values
```sql
-- Car conditions
'NEW', 'USED', 'CERTIFIED', 'DAMAGED'

-- User roles  
'USER', 'DEALER', 'ADMIN'

-- Vehicle types
'CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'SUV', 'COUPE', 'CONVERTIBLE', 'WAGON', 'HATCHBACK'

-- Fuel types
'GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUG_IN_HYBRID', 'LPG', 'CNG'
```

## ⚠️ Never Do This
```sql
-- DON'T: Update all records
UPDATE cars SET price = 0;

-- DON'T: Delete without condition  
DELETE FROM cars;

-- DON'T: Use wrong column names
SELECT firstname FROM users;  -- Use "firstName"

-- DON'T: Insert invalid UUIDs
INSERT INTO cars (id, ...) VALUES ('123', ...);
```

## 🛟 Need Help?
1. Check DATABASE_DEVELOPMENT_GUIDE.md
2. Test queries with `SELECT COUNT(*)`
3. Use transactions: `BEGIN; ... ROLLBACK;`
4. Backup before major changes