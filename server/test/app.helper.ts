import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

type Agent = ReturnType<typeof request>;

export interface TestApp {
  app: INestApplication;
  gql: (query: string, opts?: GqlOpts) => Promise<any>;
  http: () => Agent;
  close: () => Promise<void>;
}

interface GqlOpts {
  variables?: Record<string, unknown>;
  token?: string;
}

/**
 * Boot the real AppModule against the test database. The rate-limiting guard is
 * stubbed out so repeated auth calls in tests don't trip the throttle.
 */
export async function createTestApp(): Promise<TestApp> {
  // Rate limiting is disabled under NODE_ENV=test (see ThrottlerModule.skipIf
  // in app.module), so repeated auth calls here aren't throttled.
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  await app.init();

  const http = () => request(app.getHttpServer());

  const gql = async (query: string, opts: GqlOpts = {}) => {
    const req = http().post('/graphql').send({ query, variables: opts.variables ?? {} });
    if (opts.token) req.set('Authorization', `Bearer ${opts.token}`);
    return req;
  };

  return {
    app,
    gql,
    http,
    close: () => app.close(),
  };
}

let counter = 0;
/** Unique email per call so tests don't collide on the users.email unique index. */
export function uniqueEmail(prefix = 'user'): string {
  counter += 1;
  return `${prefix}.${Date.now()}.${counter}@test.example`;
}

const VALID_PASSWORD = 'Test1234';

/** Register a user (USER role) and return { token, userId, email }. */
export async function registerUser(
  t: TestApp,
  overrides: { email?: string; dealerName?: string } = {},
): Promise<{ token: string; userId: string; email: string }> {
  const email = overrides.email ?? uniqueEmail();
  const res = await t.gql(
    `mutation Register($input: RegisterInput!) {
       register(input: $input) { access_token user { id email role } }
     }`,
    {
      variables: {
        input: { email, password: VALID_PASSWORD, name: 'Test User', ...(overrides.dealerName ? { dealerName: overrides.dealerName } : {}) },
      },
    },
  );
  const data = res.body?.data?.register;
  if (!data?.access_token) {
    throw new Error(`registerUser failed: ${JSON.stringify(res.body)}`);
  }
  return { token: data.access_token, userId: data.user.id, email };
}

export const BASE_CAR = {
  make: 'Audi',
  model: 'A3',
  year: 2018,
  price: 15000,
  mileage: 60000,
  fuelType: 'GASOLINE',
  transmission: 'MANUAL',
  location: 'Skopje',
};

/** Create a listing as the given user and return the created car. */
export async function createCar(
  t: TestApp,
  token: string,
  extra: Record<string, unknown> = {},
): Promise<{ id: string; make: string; model: string }> {
  const res = await t.gql(
    `mutation C($input: CreateCarInput!) { createCar(input: $input) { id make model } }`,
    { token, variables: { input: { ...BASE_CAR, ...extra } } },
  );
  if (!res.body?.data?.createCar) {
    throw new Error(`createCar failed: ${JSON.stringify(res.body)}`);
  }
  return res.body.data.createCar;
}

export { VALID_PASSWORD };
