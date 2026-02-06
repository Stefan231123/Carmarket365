# 🗄️ CarMarket365 Database Documentation

## 📚 Documentation Files Created

| File | Purpose |
|------|---------|
| `DATABASE_DEVELOPMENT_GUIDE.md` | **Comprehensive rules & best practices** |
| `DATABASE_QUICK_REFERENCE.md` | **Quick commands & safety checklist** |
| `database-commands.txt` | **Basic command reference** |
| `scripts/validate-database.sql` | **Health check script** |
| `scripts/database-maintenance.sh` | **Automated maintenance** |

---

## 🚀 Quick Start Commands

### **Connect to Database:**
```bash
# Option 1: Use npm script
npm run db:connect

# Option 2: Direct connection
psql postgresql://postgres:password@localhost:5432/carmarket365
```

### **Essential Database Operations:**
```bash
# Create backup
npm run db:backup

# Check database health
npm run db:validate

# Run maintenance
npm run db:maintenance

# Reset with seed data
npm run db:seed

# Export schema
npm run db:schema
```

---

## 🛡️ Safety Rules Summary

### **🚫 NEVER DO:**
- Edit production data directly
- Delete without WHERE clause
- Run untested queries
- Share credentials in code
- Modify schema during runtime

### **✅ ALWAYS DO:**
- Backup before changes
- Use transactions for multi-step operations  
- Test queries first
- Use proper column quotes: `"firstName"`
- Validate data before inserting

---

## 📊 Current Database Status

### **Tables & Records:**
```
users          → 3 records  (Admin, Dealer, User accounts)
cars           → 6 records  (Sample vehicles + Tesla you added)
car_images     → 6 records  (Vehicle photos)
car_views      → 5 records  (Analytics data)
car_inquiries  → 2 records  (Customer inquiries)
saved_cars     → 2 records  (User favorites)
search_alerts  → 2 records  (Search notifications)
```

### **Sample Login Credentials:**
```
Admin:  admin@carmarket365.com  / test123
Dealer: dealer@carmarket365.com / test123
User:   user@carmarket365.com   / test123
```

---

## 🔧 Database Tools Available

### **GUI Tools (Recommended):**
1. **pgAdmin** - Full PostgreSQL management
2. **DBeaver** - Universal database tool  
3. **TablePlus** - Clean macOS interface

### **Command Line Tools:**
```bash
# Connect
psql postgresql://postgres:password@localhost:5432/carmarket365

# Essential commands
\dt                    # List tables
\d table_name         # Describe table
SELECT * FROM cars;   # View data
```

### **Automated Scripts:**
- **Health Check:** Runs data integrity validation
- **Maintenance:** Weekly cleanup and optimization
- **Backup:** Automated database backups

---

## 📈 Common Tasks

### **View Data:**
```sql
-- Show all cars
SELECT id, make, model, year, price FROM cars;

-- Show users by role
SELECT "firstName", "lastName", email, role FROM users WHERE role = 'DEALER';

-- Show popular cars (with views)
SELECT c.make, c.model, COUNT(cv.id) as view_count
FROM cars c
LEFT JOIN car_views cv ON c.id = cv."carId"
GROUP BY c.id, c.make, c.model
ORDER BY view_count DESC;
```

### **Add New Data:**
```sql
-- Add new car
INSERT INTO cars (make, model, year, price, mileage, "vehicleType", "fuelType", transmission, condition, location, "sellerId")
VALUES ('Honda', 'Civic', 2024, 28000, 0, 'CAR', 'GASOLINE', 'MANUAL', 'NEW', 'Skopje', '550e8400-e29b-41d4-a716-446655440002');

-- Add new user
INSERT INTO users (email, password, "firstName", "lastName", role, "isEmailVerified")
VALUES ('newuser@test.com', '$2b$10$...', 'New', 'User', 'USER', true);
```

### **Update Data:**
```sql
-- Update car price
UPDATE cars SET price = 30000 WHERE make = 'Honda' AND model = 'Civic';

-- Mark car as featured  
UPDATE cars SET "isFeatured" = true WHERE price > 40000;
```

---

## 🆘 Emergency Procedures

### **Database Not Working:**
```bash
# 1. Check connection
npm run db:connect

# 2. Check PostgreSQL status
brew services list | grep postgresql

# 3. Restart PostgreSQL if needed
brew services restart postgresql

# 4. Validate database
npm run db:validate
```

### **Corrupted Data:**
```bash
# 1. Create emergency backup
npm run db:backup

# 2. Run validation to identify issues
npm run db:validate

# 3. Fix issues using SQL commands
# 4. Re-validate
npm run db:validate
```

### **Need to Reset Database:**
```bash
# 1. Backup current data
npm run db:backup

# 2. Reset with seed data
npm run db:seed

# 3. Restart server
npm run start:dev
```

---

## 📞 Getting Help

### **Documentation Priority:**
1. **Quick Reference** (`DATABASE_QUICK_REFERENCE.md`) - For immediate help
2. **Development Guide** (`DATABASE_DEVELOPMENT_GUIDE.md`) - For detailed procedures  
3. **This README** - For overview and common tasks

### **Validation & Monitoring:**
```bash
# Run health check anytime
npm run db:validate

# Weekly maintenance
npm run db:maintenance
```

---

## 🔮 Next Steps

### **Recommended Weekly Tasks:**
1. Run `npm run db:validate` - Check for issues
2. Run `npm run db:maintenance` - Keep database healthy
3. Review backup files in `./backups/`
4. Monitor database size growth

### **When Adding New Features:**
1. Read `DATABASE_DEVELOPMENT_GUIDE.md` first
2. Test schema changes locally
3. Use transactions for safety
4. Update documentation
5. Run validation after changes

---

**✅ Your database is fully configured and ready for production use!**

**Connection:** `postgresql://postgres:password@localhost:5432/carmarket365`  
**GraphQL API:** `http://localhost:3002/graphql`  
**Status:** All tables created, sample data loaded, validation scripts ready

For any database questions, refer to the comprehensive guides created above! 🎉