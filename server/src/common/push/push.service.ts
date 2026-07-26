import { Injectable, Logger } from '@nestjs/common';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

export interface PushMessage {
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

/**
 * Sends push notifications to Expo push tokens via Expo's push service.
 * Best-effort: failures are logged, never thrown, so they can't break the
 * request that triggered them.
 */
@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  async sendToTokens(tokens: string[], msg: PushMessage): Promise<void> {
    const valid = tokens.filter((t) => t && t.startsWith('ExponentPushToken'));
    if (valid.length === 0) return;

    const messages = valid.map((to) => ({
      to,
      sound: 'default',
      title: msg.title,
      body: msg.body,
      data: msg.data ?? {},
    }));

    try {
      const res = await fetch(EXPO_PUSH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(messages),
      });
      if (!res.ok) {
        this.logger.warn(`Expo push failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
      }
    } catch (err) {
      this.logger.warn(`Expo push error: ${(err as Error).message}`);
    }
  }
}
