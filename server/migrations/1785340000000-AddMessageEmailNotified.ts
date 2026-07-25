import { MigrationInterface, QueryRunner } from 'typeorm';

/** Tracks whether the recipient has been emailed about an unread message. */
export class AddMessageEmailNotified1785340000000 implements MigrationInterface {
  name = 'AddMessageEmailNotified1785340000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "messages" ADD COLUMN IF NOT EXISTS "emailNotified" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN IF EXISTS "emailNotified"`);
  }
}
