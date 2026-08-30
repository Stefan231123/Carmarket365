import { Injectable, Logger } from '@nestjs/common';

export interface UpsertDealerCompanyInput {
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
}

export interface UpsertPersonInput {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyId?: string;
}

/**
 * Pushes CarMarket365 events into the self-hosted Twenty CRM via its REST API.
 * Best-effort: failures are logged, never thrown, so a CRM outage can't break
 * the request that triggered it. No-ops entirely if TWENTY_API_URL/KEY aren't
 * set, so this is safe to call unconditionally from anywhere in the app.
 */
@Injectable()
export class CrmService {
  private readonly logger = new Logger(CrmService.name);
  private readonly apiUrl = process.env.TWENTY_API_URL;
  private readonly apiKey = process.env.TWENTY_API_KEY;

  get isConfigured(): boolean {
    return Boolean(this.apiUrl && this.apiKey);
  }

  private async fetch(path: string, init: RequestInit = {}): Promise<Response | null> {
    if (!this.isConfigured) return null;
    return fetch(`${this.apiUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    });
  }

  /**
   * Looks up an existing Company by exact name and returns its id, or null.
   * Uses Twenty's REST filter syntax. Case-sensitive.
   */
  async findCompanyByName(name: string): Promise<string | null> {
    const res = await this.fetch(`/rest/companies?filter=name[eq]:${encodeURIComponent(name)}&limit=1`);
    if (!res || !res.ok) return null;
    const body: any = await res.json();
    return body?.data?.companies?.[0]?.id ?? null;
  }

  /**
   * Looks up a Person by primary email and returns its id, or null.
   */
  async findPersonByEmail(email: string): Promise<string | null> {
    const res = await this.fetch(
      `/rest/people?filter=emails.primaryEmail[eq]:${encodeURIComponent(email)}&limit=1`,
    );
    if (!res || !res.ok) return null;
    const body: any = await res.json();
    return body?.data?.people?.[0]?.id ?? null;
  }

  /**
   * Creates a Company. Returns the new record's id, or null on any failure.
   */
  async createCompany(input: UpsertDealerCompanyInput): Promise<string | null> {
    const body: Record<string, unknown> = {
      name: input.name,
      dealerStatus: 'NEW',
    };
    if (input.address || input.city) {
      body.address = {
        ...(input.address ? { addressStreet1: input.address } : {}),
        ...(input.city ? { addressCity: input.city } : {}),
      };
    }
    // Mirror city into its own top-level column for filter/group views.
    if (input.city) body.city = input.city;
    if (input.phone) body.phone1 = { primaryPhoneNumber: input.phone };
    if (input.email) body.email = { primaryEmail: input.email };

    try {
      const res = await this.fetch(`/rest/companies`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!res) return null;
      if (!res.ok) {
        this.logger.warn(`Twenty createCompany HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        return null;
      }
      const json: any = await res.json();
      return json?.data?.createCompany?.id ?? null;
    } catch (err) {
      this.logger.warn(`Twenty createCompany error: ${(err as Error).message}`);
      return null;
    }
  }

  /**
   * Creates a Person. Returns the new record's id, or null on any failure.
   */
  async createPerson(input: UpsertPersonInput): Promise<string | null> {
    const body: Record<string, unknown> = {
      name: {
        firstName: input.firstName ?? '',
        lastName: input.lastName ?? '',
      },
      emails: { primaryEmail: input.email },
    };
    if (input.phone) body.phone = { primaryPhoneNumber: input.phone };
    if (input.companyId) body.companyId = input.companyId;

    try {
      const res = await this.fetch(`/rest/people`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!res) return null;
      if (!res.ok) {
        this.logger.warn(`Twenty createPerson HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        return null;
      }
      const json: any = await res.json();
      return json?.data?.createPerson?.id ?? null;
    } catch (err) {
      this.logger.warn(`Twenty createPerson error: ${(err as Error).message}`);
      return null;
    }
  }

  /**
   * Fire-and-forget: sync a user registration to the CRM.
   *   - Non-dealers: create a Person only (dedup by email).
   *   - Dealers: create a Company (dedup by dealerName) and a Person linked
   *     to that Company as the point of contact.
   * Safe to call whether or not the CRM is configured.
   */
  async syncUserRegistration(user: {
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    dealerName?: string | null;
    dealerAddress?: string | null;
    dealerCity?: string | null;
    dealerPhoneNumber?: string | null;
  }): Promise<void> {
    if (!this.isConfigured) return;

    // Skip if this person is already in the CRM (idempotency for backfill).
    if (await this.findPersonByEmail(user.email)) return;

    let companyId: string | null = null;
    if (user.dealerName) {
      companyId =
        (await this.findCompanyByName(user.dealerName)) ??
        (await this.createCompany({
          name: user.dealerName,
          address: user.dealerAddress ?? undefined,
          city: user.dealerCity ?? undefined,
          phone: user.dealerPhoneNumber ?? undefined,
          email: user.email,
        }));
    }

    await this.createPerson({
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      email: user.email,
      phone: user.phone ?? user.dealerPhoneNumber ?? undefined,
      companyId: companyId ?? undefined,
    });
  }
}
