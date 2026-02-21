import { Injectable, Logger } from '@nestjs/common';

interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

@Injectable()
export class RecaptchaService {
  private readonly logger = new Logger(RecaptchaService.name);
  private readonly secretKey = process.env.RECAPTCHA_SECRET_KEY;
  private readonly scoreThreshold = parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || '0.5');

  /**
   * Verify a reCAPTCHA v3 token.
   * Returns true if verification passes or if CAPTCHA is not configured (dev mode).
   */
  async verify(token: string | undefined, expectedAction?: string): Promise<boolean> {
    if (!this.secretKey) {
      this.logger.warn('RECAPTCHA_SECRET_KEY not set — skipping CAPTCHA verification');
      return true;
    }

    if (!token) {
      this.logger.warn('No CAPTCHA token provided');
      return false;
    }

    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: this.secretKey,
          response: token,
        }),
      });

      const data: RecaptchaVerifyResponse = await response.json();

      if (!data.success) {
        this.logger.warn(`reCAPTCHA verification failed: ${data['error-codes']?.join(', ')}`);
        return false;
      }

      if (data.score !== undefined && data.score < this.scoreThreshold) {
        this.logger.warn(`reCAPTCHA score too low: ${data.score} (threshold: ${this.scoreThreshold})`);
        return false;
      }

      if (expectedAction && data.action !== expectedAction) {
        this.logger.warn(`reCAPTCHA action mismatch: expected "${expectedAction}", got "${data.action}"`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error(`reCAPTCHA verification error: ${error}`);
      return false;
    }
  }
}
