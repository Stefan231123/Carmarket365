// One-shot: rewrite each car's `features` and `safetyFeatures` arrays so
// legacy translated labels become canonical English keys from
// shared/equipmentOptions. Idempotent: re-running is a no-op once done.
//
// Usage:
//   npm run db:normalize-equipment            (writes)
//   npm run db:normalize-equipment:dry-run    (reports only)
//
// DATABASE_URL (or DB_HOST/PORT/USERNAME/PASSWORD/NAME) must point at the DB
// you intend to update. Run against a backup first if you're unsure.

import 'reflect-metadata';
import { AppDataSource } from '../database/data-source';
import { normalizeEquipmentValue } from '../shared/equipmentOptions';

interface CarRow {
  id: string;
  features: string[] | null;
  safetyFeatures: string[] | null;
}

function normalizeArray(arr: string[] | null | undefined): { next: string[]; changed: boolean } {
  const src = arr ?? [];
  const next: string[] = [];
  const seen = new Set<string>();
  let changed = false;
  for (const v of src) {
    const n = normalizeEquipmentValue(v);
    if (n !== v) changed = true;
    if (seen.has(n)) { changed = true; continue; }  // dedupe
    seen.add(n);
    next.push(n);
  }
  if (next.length !== src.length) changed = true;
  return { next, changed };
}

async function main() {
  const dryRun = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true';
  const label = dryRun ? '[DRY RUN]' : '[WRITE]';

  await AppDataSource.initialize();
  console.log(`${label} Connected. Scanning cars…`);

  const cars: CarRow[] = await AppDataSource.query(
    `SELECT id, features, "safetyFeatures" FROM cars`,
  );
  console.log(`${label} Found ${cars.length} car(s).`);

  let updated = 0;
  let unchanged = 0;
  const changes: Array<{ id: string; before: CarRow; after: { features: string[]; safetyFeatures: string[] } }> = [];

  for (const car of cars) {
    const f = normalizeArray(car.features);
    const s = normalizeArray(car.safetyFeatures);
    if (!f.changed && !s.changed) { unchanged++; continue; }
    changes.push({ id: car.id, before: car, after: { features: f.next, safetyFeatures: s.next } });
    if (!dryRun) {
      await AppDataSource.query(
        `UPDATE cars SET features = $1, "safetyFeatures" = $2, "updatedAt" = NOW() WHERE id = $3`,
        [f.next, s.next, car.id],
      );
    }
    updated++;
  }

  console.log(`${label} Summary: ${updated} updated, ${unchanged} unchanged.`);
  for (const c of changes) {
    console.log(`  ${c.id}`);
    console.log(`    features:       ${JSON.stringify(c.before.features)}  →  ${JSON.stringify(c.after.features)}`);
    console.log(`    safetyFeatures: ${JSON.stringify(c.before.safetyFeatures)}  →  ${JSON.stringify(c.after.safetyFeatures)}`);
  }

  await AppDataSource.destroy();
  console.log(`${label} Done.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
