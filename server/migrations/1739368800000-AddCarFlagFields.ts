import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCarFlagFields1739368800000 implements MigrationInterface {
  name = 'AddCarFlagFields1739368800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" ADD "isFlagged" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "cars" ADD "flagReason" character varying`);
    await queryRunner.query(`ALTER TABLE "cars" ADD "flaggedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "flaggedAt"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "flagReason"`);
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "isFlagged"`);
  }
}
