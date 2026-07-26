import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { gunzipSync } from 'zlib';
import { AppModule } from '../src/app.module';
import { S3Service } from '../src/common/s3/s3.service';
import { BackupService } from '../src/backup/backup.service';

/**
 * Exercises the real pg_dump | gzip pipeline against the CI Postgres, with S3
 * stubbed to capture the uploaded bytes. Proves the dump is produced, gzipped,
 * and decompresses to a genuine PostgreSQL dump — and that pg_dump is present
 * and version-compatible with the server (both pinned to 16 in CI).
 */
describe('Database backup', () => {
  let app: INestApplication;
  let backup: BackupService;
  const uploads: { key: string; body: Buffer; contentType: string }[] = [];
  const deleted: string[] = [];

  const fakeS3: Partial<S3Service> = {
    isConfigured: () => true,
    uploadBuffer: async (key: string, body: Buffer, contentType: string) => {
      uploads.push({ key, body, contentType });
    },
    listKeys: async () => [],
    deleteObject: async (key: string) => {
      deleted.push(key);
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(S3Service)
      .useValue(fakeS3)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
    backup = app.get(BackupService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('produces a gzipped SQL dump and uploads it under backups/', async () => {
    const res = await backup.runBackup();

    expect(res.key).toMatch(/^backups\/.*\.sql\.gz$/);
    expect(res.bytes).toBeGreaterThan(0);
    expect(uploads).toHaveLength(1);

    const up = uploads[0];
    expect(up.key).toBe(res.key);
    expect(up.contentType).toBe('application/gzip');
    // gzip magic bytes
    expect(up.body[0]).toBe(0x1f);
    expect(up.body[1]).toBe(0x8b);

    // Decompresses to a genuine pg_dump of our schema.
    const sql = gunzipSync(up.body).toString('utf8');
    expect(sql).toMatch(/PostgreSQL database dump/i);
    expect(sql).toMatch(/CREATE TABLE|COPY |INSERT INTO/);
    // The users table is part of the schema, so it must appear in the dump.
    expect(sql).toMatch(/users/i);
  }, 60_000);
});
