import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds the vehicle-detail and motorcycle-spec columns that were introduced on
 * the Car entity (commit c05f23d, "Add vehicle detail fields, car body types,
 * motorcycle specs, truck body types revision") but never had a matching
 * migration. Without these, TypeORM's generated SELECT references columns that
 * do not exist and every car query fails with
 * `column car.bodyType does not exist`.
 *
 * All columns are nullable and added with IF NOT EXISTS, so this is additive
 * and safe to re-run.
 */
export class AddVehicleSpecColumns1784592000000 implements MigrationInterface {
  name = 'AddVehicleSpecColumns1784592000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // General vehicle details
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "bodyType" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "co2Emissions" integer`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "numberOfGears" integer`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "weight" integer`);

    // Motorcycle-specific fields
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "coolingType" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "starterType" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "licenseClass" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "cylinders" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "cylinders"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "licenseClass"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "starterType"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "coolingType"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "weight"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "numberOfGears"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "co2Emissions"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "bodyType"`);
  }
}
