import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCarDetailFields1739455200000 implements MigrationInterface {
  name = 'AddCarDetailFields1739455200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "previousOwners" integer`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "hadAccident" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "nonSmokingVehicle" boolean`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "fullServiceHistory" boolean`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "upholsteryType" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD COLUMN IF NOT EXISTS "paintWorkType" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "paintWorkType"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "upholsteryType"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "fullServiceHistory"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "nonSmokingVehicle"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "hadAccident"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN IF EXISTS "previousOwners"`);
  }
}
