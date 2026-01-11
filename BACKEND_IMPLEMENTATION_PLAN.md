# CarMarket365 Backend Implementation Plan

## Current Status ✅

**EXCELLENT NEWS**: Your frontend API client is 100% complete!

### What's Already Perfect:
- ✅ Complete GraphQL API client (500+ lines)
- ✅ All car CRUD operations defined
- ✅ User authentication system ready
- ✅ File upload structure ready
- ✅ Country-specific filtering ready
- ✅ Express server foundation exists

### What's Missing (2-3 days work):
- ❌ GraphQL server (Apollo Server)
- ❌ Database (Prisma + PostgreSQL)
- ❌ Real API resolvers

## IMPLEMENTATION STEPS 🚀

### Step 1: Install Dependencies (10 minutes)
```bash
# GraphQL Server
npm install apollo-server-express graphql type-graphql reflect-metadata

# Database & ORM
npm install prisma @prisma/client

# Authentication & Utilities  
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# File Upload
npm install graphql-upload-ts multer
npm install -D @types/multer
```

### Step 2: Database Schema (30 minutes)
```bash
# Initialize Prisma
npx prisma init

# Create schema.prisma
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                  String   @id @default(cuid())
  email              String   @unique
  password           String
  name               String?
  role               Role     @default(USER)
  dealerName         String?
  dealerLogoUrl      String?
  dealerAddress      String?
  dealerCity         String?
  dealerPhoneNumber  String?
  savedListingIds    String[]
  cars               Car[]
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@map("users")
}

model Car {
  id           String   @id @default(cuid())
  make         String
  model        String
  year         Int
  price        Float
  mileage      Int
  fuelType     String
  transmission String
  bodyType     String?
  color        String?
  description  String?
  images       String[]
  location     String
  countryCode  String?
  isAvailable  Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  sellerId     String
  seller       User     @relation(fields: [sellerId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("cars")
}

enum Role {
  USER
  DEALER
  ADMIN
}
```

### Step 3: GraphQL Server Setup (1 hour)
```typescript
// server/graphql/index.ts
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { CarResolver } from './resolvers/CarResolver';
import { AuthResolver } from './resolvers/AuthResolver';

export async function createGraphQLServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver, CarResolver, AuthResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, user: req.user }),
    introspection: true,
    playground: true,
  });

  return server;
}
```

### Step 4: Update Server (30 minutes)
```typescript
// server/index.ts - ADD GraphQL to existing server
import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { createGraphQLServer } from "./graphql"; // NEW
import { PrismaClient } from "@prisma/client"; // NEW

const prisma = new PrismaClient(); // NEW

export function createServer() {
  const app = express();

  // Existing middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Existing routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // NEW: GraphQL Server
  const setupGraphQL = async () => {
    const server = await createGraphQLServer();
    server.applyMiddleware({ app, path: '/graphql' });
  };
  
  setupGraphQL();

  return app;
}
```

### Step 5: Create Resolvers (2 hours)
```typescript
// server/graphql/resolvers/CarResolver.ts
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { Car, CarInput, CarFilterInput } from '../types';

@Resolver()
export class CarResolver {
  @Query(() => [Car])
  async getCars(
    @Arg('filters', { nullable: true }) filters: CarFilterInput,
    @Ctx() ctx: { prisma: PrismaClient }
  ): Promise<Car[]> {
    const where: any = {};
    
    if (filters?.countryCode) where.countryCode = filters.countryCode;
    if (filters?.make) where.make = filters.make;
    if (filters?.minPrice) where.price = { gte: filters.minPrice };
    if (filters?.maxPrice) where.price = { ...where.price, lte: filters.maxPrice };
    
    return ctx.prisma.car.findMany({
      where,
      include: { seller: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Query(() => Car)
  async getCarById(
    @Arg('id') id: string,
    @Ctx() ctx: { prisma: PrismaClient }
  ): Promise<Car | null> {
    return ctx.prisma.car.findUnique({
      where: { id },
      include: { seller: true }
    });
  }

  @Mutation(() => Car)
  async createCar(
    @Arg('input') input: CarInput,
    @Ctx() ctx: { prisma: PrismaClient, user: User }
  ): Promise<Car> {
    return ctx.prisma.car.create({
      data: {
        ...input,
        sellerId: ctx.user.id
      },
      include: { seller: true }
    });
  }
}
```

### Step 6: Authentication Middleware (30 minutes)
```typescript
// server/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      req.user = user;
    }
    
    next();
  } catch (error) {
    next();
  }
}
```

### Step 7: Environment Setup (5 minutes)
```bash
# Add to .env
DATABASE_URL="postgresql://username:password@localhost:5432/carmarket365"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=3001
```

### Step 8: Database Migration (5 minutes)
```bash
# Create and apply database
createdb carmarket365
npx prisma migrate dev --name init
npx prisma generate
```

### Step 9: Start Everything (2 minutes)
```bash
# Terminal 1: Backend (GraphQL server at :3001)
npm run dev  # This should start both servers

# Terminal 2: Check GraphQL playground
open http://localhost:3001/graphql
```

## FILE STRUCTURE 📁

```
server/
├── index.ts (UPDATED - add GraphQL)
├── graphql/
│   ├── index.ts (NEW)
│   ├── resolvers/
│   │   ├── AuthResolver.ts (NEW)
│   │   ├── UserResolver.ts (NEW)
│   │   └── CarResolver.ts (NEW)
│   └── types/ (NEW)
├── middleware/
│   └── auth.ts (NEW)
└── routes/
    └── demo.ts (EXISTING)

prisma/
├── schema.prisma (NEW)
└── migrations/ (AUTO-GENERATED)
```

## TESTING PLAN 🧪

### Day 1: Database & Basic GraphQL
1. ✅ Install dependencies
2. ✅ Create Prisma schema
3. ✅ Set up basic GraphQL server
4. ✅ Test with GraphQL playground

### Day 2: Core Functionality  
1. ✅ Create all resolvers
2. ✅ Add authentication
3. ✅ Test car CRUD operations
4. ✅ Test user registration/login

### Day 3: Frontend Integration
1. ✅ Connect website to GraphQL backend
2. ✅ Test all website functionality
3. ✅ Add seed data
4. ✅ Fix any API mismatches

## SUCCESS CRITERIA ✨

**Day 1 Complete**:
- GraphQL playground accessible at localhost:3001/graphql
- Database schema created and migrated
- Basic queries working

**Day 2 Complete**:
- User registration/login working
- Car creation/listing working
- Authentication middleware working

**Day 3 Complete**:
- Website fully connected to real data
- All existing functionality working with backend
- Ready for mobile app development

## EFFORT ESTIMATE ⏱️

**Total time: 2-3 days**
- Experienced developer: 1-2 days
- Learning while building: 3-4 days
- Following this guide exactly: 2-3 days

## COST 💰

- PostgreSQL hosting: $10-20/month (Railway/Render/Heroku)
- Development time: 2-3 days
- No additional software costs

Your frontend is already perfect - this just adds the missing backend piece!