import { Injectable, Logger } from '@nestjs/common';

export interface UpsertDealerCompanyInput {
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
}

/**
 * Pushes CarMarket365 events into the self-hosted Twenty CRM via its REST API.
 * Best-effort: failures are logged, never thrown, so a CRM outage can't break
 * the request that triggered it. No-ops entirely if TWENTY_API_URL/KEY aren't set,
 * so this is safe to call unconditionally from anywhere in the app.
 */
@Injectable()
export class CrmService {
  private readonly logger = new Logger(CrmService.name);
  private readonly apiUrl = process.env.TWENTY_API_URL;
  private readonly apiKey = process.env.TWENTY_API_KEY;

  private get isConfigured(): boolean {
    return Boolean(this.apiUrl && this.apiKey);
  }

  /**
   * Creates a Company record for a new dealer signup. Twenty has no unique
   * constraint on company name, so this always creates rather than upserts --
   * acceptable for now since dealer signup is a one-time event per account.
   */
  async createDealerCompany(input: UpsertDealerCompanyInput): Promise<void> {
    if (!this.isConfigured) return;

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
    if (input.phone) {
      body.phone = { primaryPhoneNumber: input.phone };
    }
    if (input.email) {
      body.email = { primaryEmail: input.email };
    }

    try {
      const res = await fetch(`${this.apiUrl}/rest/companies`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        this.logger.warn(`Twenty CRM createCompany failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
      }
    } catch (err) {
      this.logger.warn(`Twenty CRM createCompany error: ${(err as Error).message}`);
    }
  }
}
