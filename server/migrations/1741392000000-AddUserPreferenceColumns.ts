import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPreferenceColumns1741392000000 implements MigrationInterface {
  name = 'AddUserPreferenceColumns1741392000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "cookieConsent" boolean`);
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "cookieConsentAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "cookieConsentAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "cookieConsent"`);
  }
}
