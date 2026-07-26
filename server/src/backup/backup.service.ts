import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { spawn } from 'child_process';
import { S3Service } from '../common/s3/s3.service';

/** Backups live under this (private) prefix — not in the bucket's public policy. */
const BACKUP_PREFIX = 'backups/';
/** How many of the most recent backups to keep; older ones are pruned. */
const RETAIN = Number(process.env.DB_BACKUP_RETAIN) || 14;

export interface BackupResult {
  key: string;
  bytes: number;
}

/**
 * Nightly logical database backup: `pg_dump | gzip` streamed up to S3 under
 * `backups/`. A retention window prunes old dumps. Runs on a schedule and can
 * also be triggered on demand by an admin (see BackupResolver) to verify the
 * pipeline without waiting for the cron.
 */
@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor(private readonly s3: S3Service) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async scheduled(): Promise<void> {
    try {
      const r = await this.runBackup();
      this.logger.log(`DB backup uploaded: ${r.key} (${(r.bytes / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      this.logger.error(`DB backup failed: ${(err as Error).message}`);
    }
  }

  /** Dump the database, upload it, prune old backups. Returns the new object. */
  async runBackup(): Promise<BackupResult> {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new ServiceUnavailableException('DATABASE_URL is not set');
    if (!this.s3.isConfigured()) throw new ServiceUnavailableException('S3 is not configured');

    const gz = await this.dumpGzipped(dbUrl);
    const stamp = new Date().toISOString().replace(/[:.]/g, '-'); // 2026-07-26T14-30-00-000Z
    const key = `${BACKUP_PREFIX}${stamp}.sql.gz`;
    await this.s3.uploadBuffer(key, gz, 'application/gzip');
    await this.pruneOld();
    return { key, bytes: gz.length };
  }

  /** Run `pg_dump | gzip` and resolve with the compressed bytes. */
  private dumpGzipped(dbUrl: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      // The connection string is passed via env, never argv, so it can't leak
      // into the process list. `pipefail` makes a pg_dump failure fail the pipe.
      const child = spawn(
        'bash',
        ['-c', 'set -o pipefail; pg_dump --no-owner --no-privileges "$DB_URL" | gzip -c'],
        { env: { ...process.env, DB_URL: dbUrl } },
      );
      const out: Buffer[] = [];
      const err: Buffer[] = [];
      child.stdout.on('data', (d: Buffer) => out.push(d));
      child.stderr.on('data', (d: Buffer) => err.push(d));
      child.on('error', reject);
      child.on('close', (code) => {
        if (code === 0) resolve(Buffer.concat(out));
        else reject(new Error(`pg_dump exited ${code}: ${Buffer.concat(err).toString().slice(0, 500)}`));
      });
    });
  }

  /** Keep the newest RETAIN backups (ISO-stamped keys sort chronologically). */
  private async pruneOld(): Promise<void> {
    const keys = (await this.s3.listKeys(BACKUP_PREFIX)).sort();
    const stale = keys.slice(0, Math.max(0, keys.length - RETAIN));
    for (const k of stale) await this.s3.deleteObject(k);
    if (stale.length) this.logger.log(`Pruned ${stale.length} old backup(s)`);
  }
}
