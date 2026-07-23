import 'reflect-metadata';
import { AppDataSource } from './data-source';

/**
 * Fails if the entities require schema changes that the migrations don't provide.
 *
 * This is the guard for the class of outage where a column is added to an entity
 * but no migration creates it — the app then builds fine but every query for that
 * table fails at runtime (e.g. `column car.bodyType does not exist`).
 *
 * It connects to a throwaway database, runs all migrations, then asks TypeORM what
 * `synchronize` *would* still do. If anything is left, the entities and migrations
 * have drifted.
 */
async function main() {
  await AppDataSource.initialize();
  try {
    await AppDataSource.runMigrations();

    const sqlInMemory = await AppDataSource.driver.createSchemaBuilder().log();
    const pending = sqlInMemory.upQueries;

    if (pending.length > 0) {
      console.error(
        `\n❌ Schema drift: entities need ${pending.length} change(s) that migrations don't provide.\n` +
          `   Generate a migration (npm run migration:generate) for:\n`,
      );
      for (const q of pending) {
        console.error(`   - ${q.query}`);
      }
      process.exitCode = 1;
      return;
    }

    console.log('✅ Schema in sync — entities and migrations agree.');
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((err) => {
  console.error('Schema check failed to run:', err);
  process.exitCode = 1;
});
