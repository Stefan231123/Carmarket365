import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

export interface PresignedUpload {
  uploadUrl: string;
  key: string;
  publicUrl: string;
}

/** Only these image types may be uploaded. The content type is baked into the
 *  signature, so the client cannot deviate from what was approved here. */
const ALLOWED_CONTENT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const URL_TTL_SECONDS = 300; // 5 minutes

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  // Accept either name: AWS_S3_BUCKET is consistent with the other AWS_*
  // variables, S3_BUCKET is kept for backwards compatibility.
  private readonly bucket = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET;
  private readonly region = process.env.AWS_REGION;
  private client: S3Client | null = null;

  constructor() {
    if (!this.bucket || !this.region) {
      this.logger.warn(
        `S3 not configured — image uploads will fail. ` +
          `bucket(AWS_S3_BUCKET|S3_BUCKET)=${this.bucket ? 'set' : 'MISSING'}, ` +
          `AWS_REGION=${this.region ? 'set' : 'MISSING'}`,
      );
      return;
    }
    this.client = new S3Client({ region: this.region });
    this.logger.log(`S3 configured — bucket "${this.bucket}" in ${this.region}`);
  }

  isConfigured(): boolean {
    return this.client !== null;
  }

  /** Public CDN-style URL an object will be reachable at once uploaded. */
  publicUrlFor(key: string): string {
    const base = process.env.S3_PUBLIC_BASE_URL;
    if (base) return `${base.replace(/\/$/, '')}/${key}`;
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  /**
   * Create a short-lived presigned PUT URL scoped to a single object key and
   * content type. The caller uploads straight to S3 — bytes never touch us.
   */
  async createPresignedUpload(folder: string, fileName: string, contentType: string): Promise<PresignedUpload> {
    if (!this.client) {
      throw new InternalServerErrorException('S3 is not configured on the server');
    }
    if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
      throw new InternalServerErrorException(`Unsupported image type: ${contentType}`);
    }

    // Never trust the client filename in the key — derive a safe extension only.
    const ext = this.extensionFor(contentType);
    const key = `${folder}/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.client, command, { expiresIn: URL_TTL_SECONDS });
    return { uploadUrl, key, publicUrl: this.publicUrlFor(key) };
  }

  async deleteObject(key: string): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    } catch (err) {
      this.logger.warn(`Failed to delete S3 object ${key}: ${err}`);
    }
  }

  /**
   * Upload bytes from the server directly (used for database backups — the
   * `backups/` prefix is NOT in the bucket's public-read policy, so it stays
   * private). Buffers the whole body; fine for the small dumps we produce.
   */
  async uploadBuffer(key: string, body: Buffer, contentType: string): Promise<void> {
    if (!this.client) {
      throw new InternalServerErrorException('S3 is not configured on the server');
    }
    await this.client.send(
      new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: body, ContentType: contentType }),
    );
  }

  /** List object keys under a prefix (newest sorting is left to the caller). */
  async listKeys(prefix: string): Promise<string[]> {
    if (!this.client) return [];
    const keys: string[] = [];
    let token: string | undefined;
    do {
      const res = await this.client.send(
        new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix, ContinuationToken: token }),
      );
      for (const obj of res.Contents ?? []) if (obj.Key) keys.push(obj.Key);
      token = res.IsTruncated ? res.NextContinuationToken : undefined;
    } while (token);
    return keys;
  }

  private extensionFor(contentType: string): string {
    switch (contentType) {
      case 'image/png':
        return 'png';
      case 'image/webp':
        return 'webp';
      default:
        return 'jpg';
    }
  }
}
