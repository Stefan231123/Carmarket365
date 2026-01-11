# Car Market Platform - Integration Testing Guide

This document provides step-by-step instructions to test the integration between the frontend and backend systems.

## Prerequisites

### Backend Setup
1. **Database**: Ensure PostgreSQL is running with the configuration in `.env`:
   - Host: localhost:5432
   - Database: carmarket365_db
   - Username: stefankocevski
   - Password: 225533

2. **Environment Variables**: Verify `.env` file has:
   ```env
   DATABASE_TYPE=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=stefankocevski
   DATABASE_PASSWORD=225533
   DATABASE_NAME=carmarket365_db
   JWT_SECRET=YOFgiqIoBBQzr0hMLpuTMRCXKfXjGmfNUvrZ1JCc9yNBQ
   ```

3. **Start Backend**:
   ```bash
   cd /Users/stefankocevski/documents/my-carmarket-backend
   npm run start:dev
   ```
   Backend should be running on http://localhost:3000

### Frontend Setup
1. **Start Frontend**:
   ```bash
   cd /Users/stefankocevski/documents/my-carmarket-frontend/flare-realm
   npm run dev
   ```
   Frontend should be running on http://localhost:8080

## Integration Tests

### 1. Test GraphQL Endpoint
First, verify the GraphQL playground is accessible:
- Visit: http://localhost:3000/graphql
- You should see the GraphQL Playground

### 2. Test User Registration
**Via GraphQL Playground:**
```graphql
mutation {
  register(email: "test@example.com", password: "password123", name: "Test User") {
    access_token
    user {
      id
      email
      name
      role
    }
  }
}
```

**Expected Result:** Should return a JWT token and user information.

### 3. Test User Login
**Via GraphQL Playground:**
```graphql
mutation {
  login(email: "test@example.com", password: "password123") {
    access_token
    user {
      id
      email
      name
      role
    }
  }
}
```

### 4. Test Frontend Authentication Flow

1. **Visit Frontend**: http://localhost:8080
2. **Navigate to Sign In**: Click "Sign In" in the header
3. **Test Registration**: 
   - Try creating a new account
   - Should redirect to home page on success
   - Check browser's localStorage for auth_token
4. **Test Login**:
   - Use existing credentials
   - Should authenticate and redirect
5. **Test Protected Routes**:
   - Visit /dealer-dashboard (should redirect if not dealer)
   - Visit /admin-dashboard (should redirect if not admin)

### 5. Test Car Data Fetching

**Via GraphQL Playground (requires sample data):**
```graphql
query {
  cars {
    id
    make
    model
    year
    price
    mileage
    fuelType
    transmission
    images
    location
    seller {
      name
      dealerName
    }
  }
}
```

### 6. Test Frontend Car Browsing

1. **Visit Cars Page**: http://localhost:8080/cars
2. **Check Loading States**: Should show skeleton loaders initially
3. **Test Search**: Use the search filters
4. **Test Error Handling**: If backend is down, should show error message with retry button

## Expected Integration Points

### ✅ Working Features
- CORS properly configured
- GraphQL endpoint accessible
- Authentication mutations work
- JWT token storage in localStorage
- Error boundaries catch API failures
- Loading states display correctly

### 🔍 Common Issues & Solutions

#### Issue: CORS Errors
**Solution**: Ensure backend CORS is configured for localhost:8080 and frontend is making requests to localhost:3000

#### Issue: GraphQL Playground Not Working
**Solution**: Check that NestJS GraphQL module is properly configured and backend is running

#### Issue: Authentication Not Persisting
**Solution**: 
- Check if JWT token is stored in localStorage
- Verify auth context is checking localStorage on app load
- Ensure backend JWT secret matches frontend expectations

#### Issue: No Data Displayed
**Solution**:
- Add sample data to database
- Check GraphQL queries return data
- Verify frontend hooks are calling the API correctly

## Database Sample Data (Optional)

To test with sample data, you can manually insert some car makes and models:

```sql
-- Insert sample car makes
INSERT INTO car_make (id, name, created_at, updated_at) VALUES
  (gen_random_uuid(), 'BMW', NOW(), NOW()),
  (gen_random_uuid(), 'Mercedes-Benz', NOW(), NOW()),
  (gen_random_uuid(), 'Audi', NOW(), NOW()),
  (gen_random_uuid(), 'Volkswagen', NOW(), NOW());

-- Insert sample car models (adjust IDs to match your car_make entries)
-- You'll need to get the actual IDs from the car_make table first
```

## Success Criteria

The integration is successful when:

1. ✅ Backend starts without errors
2. ✅ Frontend starts without errors  
3. ✅ GraphQL Playground accessible
4. ✅ User can register/login via frontend
5. ✅ Authentication state persists across page refreshes
6. ✅ Car browsing page loads (even if empty)
7. ✅ Error handling works when backend is unavailable
8. ✅ Loading states display correctly
9. ✅ CORS allows frontend-backend communication

## Next Steps

Once basic integration is working:
1. Add sample data to test full car CRUD operations
2. Test image upload functionality
3. Test advanced search and filtering
4. Test dealer-specific features
5. Test admin dashboard functionality