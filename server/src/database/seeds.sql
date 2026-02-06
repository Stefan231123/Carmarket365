-- Clear existing data first
TRUNCATE TABLE car_views, car_inquiries, saved_cars, search_alerts, car_images, cars, users CASCADE;

-- Seed data for CarMarket365 database

-- Insert sample users  
INSERT INTO users (id, email, password, "firstName", "lastName", role, "isEmailVerified", "createdAt", "updatedAt") VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@carmarket365.com', '$2b$10$rOGGYs2f6pQJUZLZQGb8DeQ8FPc7KvUGqJ7X8LQqKd8pY7HO3LmXy', 'Admin', 'User', 'ADMIN', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'dealer@carmarket365.com', '$2b$10$rOGGYs2f6pQJUZLZQGb8DeQ8FPc7KvUGqJ7X8LQqKd8pY7HO3LmXy', 'Car', 'Dealer', 'DEALER', true, NOW(), NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'user@carmarket365.com', '$2b$10$rOGGYs2f6pQJUZLZQGb8DeQ8FPc7KvUGqJ7X8LQqKd8pY7HO3LmXy', 'Regular', 'User', 'USER', true, NOW(), NOW());

-- Update dealer user with dealer-specific info
UPDATE users SET 
  "dealerStatus" = 'APPROVED',
  "dealerName" = 'Premium Auto Sales',
  "dealerLicenseNumber" = 'DL-2024-001',
  "dealerAddress" = '123 Auto Street',
  "dealerCity" = 'Skopje',
  "dealerRegion" = 'Skopje',
  "dealerCountry" = 'Macedonia',
  "dealerPhoneNumber" = '+389-75-123-456',
  "dealerWebsite" = 'https://premiumautosales.com',
  "dealerWorkingHours" = '{"Mon-Fri: 9:00-18:00", "Sat: 9:00-17:00", "Sun: 12:00-17:00"}',
  "dealerServices" = '{"Sales", "Financing", "Warranty", "Trade-in", "Service"}'
WHERE email = 'dealer@carmarket365.com';

-- Insert sample cars
INSERT INTO cars (
  id, make, model, year, price, mileage, "vehicleType", "fuelType", transmission, condition, 
  drivetrain, doors, seats, color, vin, description, location, "countryCode", 
  "sellerId", "isAvailable", "isFeatured", "createdAt", "updatedAt"
) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'BMW', '3 Series', 2021, 35000.00, 25000, 'CAR', 'GASOLINE', 'AUTOMATIC', 'USED', 'AWD', 4, 5, 'Black', '1HGBH41JXMN109186', 'Beautiful BMW 3 Series with low mileage and excellent condition. Features premium interior, navigation system, and advanced safety features.', 'Skopje, Macedonia', 'MK', '550e8400-e29b-41d4-a716-446655440002', true, true, NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440002', 'Mercedes-Benz', 'C-Class', 2020, 42000.00, 35000, 'CAR', 'GASOLINE', 'AUTOMATIC', 'CERTIFIED', 'RWD', 4, 5, 'Silver', '2HGBH41JXMN109187', 'Luxury Mercedes-Benz C-Class with premium features. Well maintained with full service history.', 'Ohrid, Macedonia', 'MK', '550e8400-e29b-41d4-a716-446655440002', true, true, NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440003', 'Audi', 'A4', 2019, 28000.00, 45000, 'CAR', 'DIESEL', 'MANUAL', 'USED', 'FWD', 4, 5, 'White', '3HGBH41JXMN109188', 'Reliable Audi A4 with diesel engine for excellent fuel economy. Perfect for daily commuting.', 'Bitola, Macedonia', 'MK', '550e8400-e29b-41d4-a716-446655440002', true, false, NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440004', 'Volkswagen', 'Golf', 2018, 18000.00, 60000, 'CAR', 'GASOLINE', 'MANUAL', 'USED', 'FWD', 5, 5, 'Blue', '4HGBH41JXMN109189', 'Popular Volkswagen Golf in great condition. Economical and reliable city car.', 'Prilep, Macedonia', 'MK', '550e8400-e29b-41d4-a716-446655440002', true, false, NOW(), NOW()),
('660e8400-e29b-41d4-a716-446655440005', 'Ford', 'Focus', 2017, 15000.00, 70000, 'CAR', 'GASOLINE', 'AUTOMATIC', 'USED', 'FWD', 5, 5, 'Red', '5HGBH41JXMN109190', 'Well-maintained Ford Focus with automatic transmission. Great value for money.', 'Kumanovo, Macedonia', 'MK', '550e8400-e29b-41d4-a716-446655440002', true, false, NOW(), NOW());

-- Insert sample car images
INSERT INTO car_images (id, url, "altText", "sortOrder", "isMain", "isInterior", "carId", "createdAt") VALUES
('770e8400-e29b-41d4-a716-446655440001', 'https://example.com/images/bmw-3-series-exterior-1.jpg', 'BMW 3 Series exterior front view', 0, true, false, '660e8400-e29b-41d4-a716-446655440001', NOW()),
('770e8400-e29b-41d4-a716-446655440002', 'https://example.com/images/bmw-3-series-interior-1.jpg', 'BMW 3 Series interior dashboard', 1, false, true, '660e8400-e29b-41d4-a716-446655440001', NOW()),
('770e8400-e29b-41d4-a716-446655440003', 'https://example.com/images/mercedes-c-class-exterior-1.jpg', 'Mercedes-Benz C-Class exterior', 0, true, false, '660e8400-e29b-41d4-a716-446655440002', NOW()),
('770e8400-e29b-41d4-a716-446655440004', 'https://example.com/images/audi-a4-exterior-1.jpg', 'Audi A4 exterior view', 0, true, false, '660e8400-e29b-41d4-a716-446655440003', NOW()),
('770e8400-e29b-41d4-a716-446655440005', 'https://example.com/images/vw-golf-exterior-1.jpg', 'Volkswagen Golf exterior', 0, true, false, '660e8400-e29b-41d4-a716-446655440004', NOW()),
('770e8400-e29b-41d4-a716-446655440006', 'https://example.com/images/ford-focus-exterior-1.jpg', 'Ford Focus exterior view', 0, true, false, '660e8400-e29b-41d4-a716-446655440005', NOW());

-- Insert sample saved cars (user saved some cars)
INSERT INTO saved_cars (id, "userId", "carId", "createdAt") VALUES
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', NOW()),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', NOW());

-- Insert sample search alerts
INSERT INTO search_alerts (id, name, make, "vehicleType", "priceFrom", "priceTo", frequency, "isActive", "userId", "createdAt", "updatedAt") VALUES
('990e8400-e29b-41d4-a716-446655440001', 'BMW Cars Under 40k', 'BMW', 'CAR', 20000.00, 40000.00, 'DAILY', true, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('990e8400-e29b-41d4-a716-446655440002', 'Luxury Sedans', NULL, 'CAR', 35000.00, 80000.00, 'WEEKLY', true, '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW());

-- Insert sample car inquiries
INSERT INTO car_inquiries (id, name, email, phone, type, message, status, "carId", "userId", "createdAt", "updatedAt") VALUES
('aa0e8400-e29b-41d4-a716-446655440001', 'John Doe', 'john.doe@example.com', '+1-555-0199', 'GENERAL', 'Hi, I am interested in this BMW 3 Series. Can we schedule a test drive?', 'PENDING', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW()),
('aa0e8400-e29b-41d4-a716-446655440002', 'Jane Smith', 'jane.smith@example.com', '+1-555-0188', 'FINANCING', 'What financing options are available for the Mercedes C-Class?', 'REPLIED', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', NOW(), NOW());

-- Insert sample car views (analytics)
INSERT INTO car_views (id, "carId", "userId", "ipAddress", "userAgent", "createdAt") VALUES
('bb0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '192.168.1.100', 'Mozilla/5.0 Browser', NOW() - INTERVAL '1 day'),
('bb0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', NULL, '192.168.1.101', 'Mozilla/5.0 Browser', NOW() - INTERVAL '2 hours'),
('bb0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '192.168.1.100', 'Mozilla/5.0 Browser', NOW() - INTERVAL '3 hours'),
('bb0e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440002', NULL, '192.168.1.102', 'Mozilla/5.0 Browser', NOW() - INTERVAL '1 hour'),
('bb0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440003', NULL, '192.168.1.103', 'Mozilla/5.0 Browser', NOW() - INTERVAL '30 minutes');