import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1739282400000 implements MigrationInterface {
  name = 'InitialSchema1739282400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if tables already exist (from previous synchronize: true)
    const tableExists = await queryRunner.query(
      `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users')`
    );

    if (tableExists[0].exists) {
      console.log('Tables already exist (created by synchronize). Skipping initial schema creation.');
      return;
    }

    // Create enum types
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'DEALER', 'ADMIN')`);
    await queryRunner.query(`CREATE TYPE "public"."users_dealerstatus_enum" AS ENUM('PENDING', 'APPROVED', 'SUSPENDED', 'REJECTED')`);
    await queryRunner.query(`CREATE TYPE "public"."cars_vehicletype_enum" AS ENUM('CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'SUV', 'COUPE', 'CONVERTIBLE', 'WAGON', 'HATCHBACK', 'SEDAN')`);
    await queryRunner.query(`CREATE TYPE "public"."cars_fueltype_enum" AS ENUM('GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUGIN_HYBRID', 'LPG', 'CNG', 'HYDROGEN')`);
    await queryRunner.query(`CREATE TYPE "public"."cars_transmission_enum" AS ENUM('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC', 'CVT')`);
    await queryRunner.query(`CREATE TYPE "public"."cars_condition_enum" AS ENUM('NEW', 'USED', 'CERTIFIED', 'DAMAGED')`);
    await queryRunner.query(`CREATE TYPE "public"."cars_drivetrain_enum" AS ENUM('FWD', 'RWD', 'AWD', 'FOUR_WD')`);
    await queryRunner.query(`CREATE TYPE "public"."car_inquiries_type_enum" AS ENUM('GENERAL', 'TEST_DRIVE', 'FINANCING', 'TRADE_IN', 'PRICE_NEGOTIATION', 'TECHNICAL_DETAILS', 'INSPECTION')`);
    await queryRunner.query(`CREATE TYPE "public"."car_inquiries_status_enum" AS ENUM('PENDING', 'REPLIED', 'CLOSED', 'SPAM')`);
    await queryRunner.query(`CREATE TYPE "public"."search_alerts_vehicletype_enum" AS ENUM('CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'SUV', 'COUPE', 'CONVERTIBLE', 'WAGON', 'HATCHBACK', 'SEDAN')`);
    await queryRunner.query(`CREATE TYPE "public"."search_alerts_fueltype_enum" AS ENUM('GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUGIN_HYBRID', 'LPG', 'CNG', 'HYDROGEN')`);
    await queryRunner.query(`CREATE TYPE "public"."search_alerts_transmission_enum" AS ENUM('MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC', 'CVT')`);
    await queryRunner.query(`CREATE TYPE "public"."search_alerts_frequency_enum" AS ENUM('INSTANT', 'DAILY', 'WEEKLY')`);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "password" character varying,
        "authProvider" character varying DEFAULT 'local',
        "firstName" character varying,
        "lastName" character varying,
        "phone" character varying,
        "avatarUrl" character varying,
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER',
        "isActive" boolean NOT NULL DEFAULT true,
        "isEmailVerified" boolean NOT NULL DEFAULT false,
        "emailVerificationToken" character varying,
        "passwordResetToken" character varying,
        "passwordResetExpires" TIMESTAMP,
        "lastLoginAt" TIMESTAMP,
        "languagePreference" character varying,
        "countryPreference" character varying,
        "marketingEmailsEnabled" boolean NOT NULL DEFAULT true,
        "smsNotificationsEnabled" boolean NOT NULL DEFAULT false,
        "dealerName" character varying,
        "dealerBusinessNumber" character varying,
        "dealerLicenseNumber" character varying,
        "dealerStatus" "public"."users_dealerstatus_enum",
        "dealerLogoUrl" character varying,
        "dealerDescription" text,
        "dealerAddress" character varying,
        "dealerCity" character varying,
        "dealerRegion" character varying,
        "dealerPostalCode" character varying,
        "dealerCountry" character varying,
        "dealerPhoneNumber" character varying,
        "dealerWebsite" character varying,
        "dealerLatitude" numeric(10,6),
        "dealerLongitude" numeric(10,6),
        "dealerWorkingHours" text[] NOT NULL DEFAULT '{}',
        "dealerServices" text[] NOT NULL DEFAULT '{}',
        "dealerApprovedAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Create cars table
    await queryRunner.query(`
      CREATE TABLE "cars" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "make" character varying NOT NULL,
        "model" character varying NOT NULL,
        "variant" character varying,
        "year" integer NOT NULL,
        "price" numeric(12,2) NOT NULL,
        "mileage" integer NOT NULL,
        "vehicleType" "public"."cars_vehicletype_enum" NOT NULL DEFAULT 'CAR',
        "fuelType" "public"."cars_fueltype_enum" NOT NULL,
        "transmission" "public"."cars_transmission_enum" NOT NULL,
        "condition" "public"."cars_condition_enum" NOT NULL DEFAULT 'USED',
        "color" character varying,
        "interiorColor" character varying,
        "description" text,
        "engineSize" integer,
        "horsePower" integer,
        "doors" integer,
        "seats" integer,
        "drivetrain" "public"."cars_drivetrain_enum",
        "vin" character varying,
        "licensePlate" character varying,
        "features" text[] NOT NULL DEFAULT '{}',
        "safetyFeatures" text[] NOT NULL DEFAULT '{}',
        "location" character varying NOT NULL,
        "city" character varying,
        "region" character varying,
        "countryCode" character varying,
        "latitude" numeric(10,6),
        "longitude" numeric(10,6),
        "isAvailable" boolean NOT NULL DEFAULT true,
        "isFeatured" boolean NOT NULL DEFAULT false,
        "isCertified" boolean NOT NULL DEFAULT false,
        "warrantyMonths" integer,
        "fuelConsumption" numeric(5,2),
        "emissionClass" character varying,
        "viewCount" integer NOT NULL DEFAULT 0,
        "favoriteCount" integer NOT NULL DEFAULT 0,
        "inquiryCount" integer NOT NULL DEFAULT 0,
        "contactPhone" character varying,
        "contactEmail" character varying,
        "allowTestDrive" boolean NOT NULL DEFAULT false,
        "acceptsTradeIn" boolean NOT NULL DEFAULT false,
        "originalPrice" numeric(12,2),
        "priceNegotiable" boolean,
        "quickSale" boolean,
        "sellerId" uuid NOT NULL,
        "lastPriceUpdate" TIMESTAMP,
        "featuredUntil" TIMESTAMP,
        "soldAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cars" PRIMARY KEY ("id"),
        CONSTRAINT "FK_cars_seller" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    // Create car_images table
    await queryRunner.query(`
      CREATE TABLE "car_images" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "url" character varying NOT NULL,
        "thumbnailUrl" character varying,
        "altText" character varying,
        "sortOrder" integer NOT NULL DEFAULT 0,
        "isMain" boolean NOT NULL DEFAULT false,
        "isInterior" boolean NOT NULL DEFAULT false,
        "originalFileName" character varying,
        "fileSize" integer,
        "mimeType" character varying,
        "width" integer,
        "height" integer,
        "carId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_car_images" PRIMARY KEY ("id"),
        CONSTRAINT "FK_car_images_car" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    // Create car_views table
    await queryRunner.query(`
      CREATE TABLE "car_views" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "ipAddress" character varying,
        "userAgent" character varying,
        "referrer" character varying,
        "sessionId" character varying,
        "countryCode" character varying,
        "city" character varying,
        "carId" uuid NOT NULL,
        "userId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_car_views" PRIMARY KEY ("id"),
        CONSTRAINT "FK_car_views_car" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_car_views_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    // Create car_views indexes
    await queryRunner.query(`CREATE INDEX "IDX_car_views_car_created" ON "car_views" ("carId", "createdAt")`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_car_views_user_car" ON "car_views" ("userId", "carId") WHERE "userId" IS NOT NULL`);

    // Create car_inquiries table
    await queryRunner.query(`
      CREATE TABLE "car_inquiries" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "phone" character varying,
        "type" "public"."car_inquiries_type_enum" NOT NULL DEFAULT 'GENERAL',
        "message" text NOT NULL,
        "status" "public"."car_inquiries_status_enum" NOT NULL DEFAULT 'PENDING',
        "sellerResponse" text,
        "preferredContactMethod" character varying,
        "preferredTestDriveDate" TIMESTAMP,
        "tradeInVehicle" character varying,
        "offerPrice" numeric(12,2),
        "ipAddress" character varying,
        "userAgent" character varying,
        "carId" uuid NOT NULL,
        "userId" uuid,
        "repliedAt" TIMESTAMP,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_car_inquiries" PRIMARY KEY ("id"),
        CONSTRAINT "FK_car_inquiries_car" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_car_inquiries_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);

    // Create saved_cars table
    await queryRunner.query(`
      CREATE TABLE "saved_cars" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "carId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_saved_cars" PRIMARY KEY ("id"),
        CONSTRAINT "FK_saved_cars_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_saved_cars_car" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    // Create saved_cars unique index
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_saved_cars_user_car" ON "saved_cars" ("userId", "carId")`);

    // Create search_alerts table
    await queryRunner.query(`
      CREATE TABLE "search_alerts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "make" character varying,
        "model" character varying,
        "vehicleType" "public"."search_alerts_vehicletype_enum",
        "yearFrom" integer,
        "yearTo" integer,
        "priceFrom" numeric(12,2),
        "priceTo" numeric(12,2),
        "mileageFrom" integer,
        "mileageTo" integer,
        "fuelType" "public"."search_alerts_fueltype_enum",
        "transmission" "public"."search_alerts_transmission_enum",
        "location" character varying,
        "countryCode" character varying,
        "radiusKm" integer,
        "features" text[] NOT NULL DEFAULT '{}',
        "isActive" boolean NOT NULL DEFAULT true,
        "emailNotifications" boolean NOT NULL DEFAULT true,
        "smsNotifications" boolean NOT NULL DEFAULT false,
        "lastNotificationSent" TIMESTAMP,
        "matchCount" integer NOT NULL DEFAULT 0,
        "newMatchCount" integer NOT NULL DEFAULT 0,
        "frequency" "public"."search_alerts_frequency_enum" NOT NULL DEFAULT 'DAILY',
        "lastTriggered" TIMESTAMP,
        "userId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_search_alerts" PRIMARY KEY ("id"),
        CONSTRAINT "FK_search_alerts_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);

    // Enable uuid-ossp extension if not already enabled
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "search_alerts" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "saved_cars" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "car_inquiries" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "car_views" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "car_images" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "cars" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."search_alerts_frequency_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."search_alerts_transmission_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."search_alerts_fueltype_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."search_alerts_vehicletype_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."car_inquiries_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."car_inquiries_type_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."cars_drivetrain_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."cars_condition_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."cars_transmission_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."cars_fueltype_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."cars_vehicletype_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."users_dealerstatus_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."users_role_enum"`);
  }
}
