/**
 * One-shot backfill: push every existing User to Twenty CRM. Idempotent — the
 * service dedups by email, so re-runs are safe. Run once from a terminal that
 * has the same DATABASE_URL + TWENTY_* env vars as prod (or via Railway shell).
 *
 *   cd server && ts-node -T src/common/crm/backfill-crm.ts
 *
 * or compiled:
 *
 *   node dist/common/crm/backfill-crm.js
 */
/* eslint-disable no-console */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { CrmService } from './crm.service';
import { User } from '../../users/user.entity';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  try {
    const crm = app.get(CrmService);
    if (!crm.isConfigured) {
      console.error('TWENTY_API_URL / TWENTY_API_KEY not set — aborting.');
      process.exit(1);
    }
    const users = app.get<Repository<User>>(getRepositoryToken(User));
    const all = await users.find({ order: { id: 'ASC' } });
    console.log(`Backfilling ${all.length} users into Twenty CRM...`);

    let ok = 0, fail = 0;
    for (const u of all) {
      try {
        await crm.syncUserRegistration({
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          phone: u.phone ?? u.dealerPhoneNumber,
          dealerName: u.dealerName,
          dealerAddress: u.dealerAddress,
          dealerCity: u.dealerCity,
          dealerPhoneNumber: u.dealerPhoneNumber,
        });
        ok++;
        if (ok % 25 === 0) console.log(`  ...${ok} processed`);
      } catch (err) {
        fail++;
        console.error(`  FAIL ${u.email}: ${(err as Error).message}`);
      }
    }
    console.log(`Done: ${ok} ok, ${fail} failed.`);
  } finally {
    await app.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
