import type { BrowserContext, Cookie } from '@playwright/test';

/**
 * Helpers for WRITE-flow E2E tests.
 *
 * These tests create data (accounts, listings, messages), so they must only
 * ever run against the isolated **staging** environment — never production.
 * `isStaging()` gates every write spec; seeding goes through staging's GraphQL
 * API (CAPTCHA is disabled there, so register/login work headlessly).
 */

export const STAGING_WEB = 'https://staging.carmarket365.com';
export const STAGING_API = 'https://api-staging.carmarket365.com/graphql';

/** True only when the run is pointed at staging — write specs skip otherwise. */
export function isStaging(): boolean {
  const base = process.env.E2E_BASE_URL || '';
  return base.includes('staging.carmarket365.com');
}

async function gql<T = any>(query: string, variables: Record<string, unknown>, token?: string): Promise<T> {
  const res = await fetch(STAGING_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) throw new Error(`GraphQL error: ${json.errors.map((e) => e.message).join('; ')}`);
  return json.data as T;
}

export interface SeededUser {
  id: string;
  email: string;
  password: string;
  token: string;
}

/** Register a fresh, unique account on staging and return its token. */
export async function seedUser(prefix = 'e2e'): Promise<SeededUser> {
  const email = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@cm365-e2e.test`;
  const password = 'E2ePassw0rd';
  const data = await gql<{ register: { access_token: string; user: { id: string } } }>(
    `mutation R($i: RegisterInput!) { register(input: $i) { access_token user { id } } }`,
    { i: { email, password, name: `E2E ${prefix}` } },
  );
  return { id: data.register.user.id, email, password, token: data.register.access_token };
}

export interface SeededListing {
  id: string;
  title: string;
}

/** Create a listing owned by `token`'s account. Returns id + a display title. */
export async function seedListing(token: string): Promise<SeededListing> {
  const data = await gql<{ createCar: { id: string; year: number; make: string; model: string } }>(
    `mutation C($i: CreateCarInput!) { createCar(input: $i) { id year make model } }`,
    {
      i: {
        make: 'Volkswagen',
        model: 'Golf',
        year: 2019,
        price: 12500,
        mileage: 85000,
        fuelType: 'DIESEL',
        transmission: 'MANUAL',
        location: 'Skopje',
      },
    },
    token,
  );
  const c = data.createCar;
  return { id: c.id, title: `${c.year} ${c.make} ${c.model}` };
}

/** Total unread messages for the given account (used to assert delivery). */
export async function unreadCount(token: string): Promise<number> {
  const data = await gql<{ getUnreadMessageCount: number }>(`query { getUnreadMessageCount }`, {}, token);
  return data.getUnreadMessageCount;
}

/**
 * Log a browser context in as `token`'s user by injecting the same auth the
 * backend would set: the httpOnly `access_token` cookie (mirrors COOKIE_OPTIONS)
 * plus the localStorage bearer the SPA also reads.
 */
export async function loginContext(context: BrowserContext, token: string): Promise<void> {
  const cookie: Cookie = {
    name: 'access_token',
    value: token,
    domain: '.carmarket365.com',
    path: '/',
    expires: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };
  await context.addCookies([cookie]);
  await context.addInitScript((t) => {
    try {
      window.localStorage.setItem('cm365_token', t as string);
    } catch {
      /* storage may be unavailable pre-navigation; cookie still authenticates */
    }
  }, token);
}
