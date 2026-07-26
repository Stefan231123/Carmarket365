import { MigrationInterface, QueryRunner } from 'typeorm';

/** Stores a user's Expo push token for mobile notifications. */
export class AddUserPushToken1785440000000 implements MigrationInterface {
  name = 'AddUserPushToken1785440000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "expoPushToken" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "expoPushToken"`);
  }
}
