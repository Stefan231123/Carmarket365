import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend | null = null;
  private readonly fromAddress = 'CarMarket365 <noreply@carmarket365.com>';

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.logger.log('Resend email service initialized');
    } else {
      this.logger.warn('RESEND_API_KEY not set — emails will be logged to console only');
    }
  }

  async sendEmail(template: EmailTemplate): Promise<boolean> {
    if (!this.resend) {
      this.logger.log(`[DEV] Email to: ${template.to} | Subject: ${template.subject}`);
      return true;
    }

    try {
      const { error } = await this.resend.emails.send({
        from: this.fromAddress,
        to: template.to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      if (error) {
        this.logger.error(`Failed to send email to ${template.to}: ${error.message}`);
        return false;
      }

      this.logger.log(`Email sent to ${template.to}: ${template.subject}`);
      return true;
    } catch (error) {
      this.logger.error(`Email send error: ${error}`);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Welcome to CarMarket365!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Welcome${name ? ', ' + name : ''}!</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for joining CarMarket365 — the leading multilingual car marketplace in Europe.
            </p>
            <p style="color: #555; line-height: 1.6;">Here's what you can do:</p>
            <ul style="color: #555; line-height: 1.8;">
              <li>Browse thousands of car listings</li>
              <li>Save your favorite cars</li>
              <li>Post your own car for sale</li>
              <li>Contact sellers directly</li>
            </ul>
            <a href="https://www.carmarket365.com" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              Start Browsing
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Welcome${name ? ', ' + name : ''}! Thank you for joining CarMarket365. Start browsing at https://www.carmarket365.com`,
    });
  }

  async sendInquiryNotification(
    sellerEmail: string,
    carTitle: string,
    inquirerName: string,
    inquirerEmail: string,
    message: string,
  ): Promise<boolean> {
    return this.sendEmail({
      to: sellerEmail,
      subject: `New inquiry about your listing: ${carTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">New Inquiry Received</h2>
            <p style="color: #555; line-height: 1.6;">
              Someone is interested in your car listing: <strong>${carTitle}</strong>
            </p>
            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 8px; color: #333;"><strong>From:</strong> ${inquirerName}</p>
              <p style="margin: 0 0 8px; color: #333;"><strong>Email:</strong> ${inquirerEmail}</p>
              <p style="margin: 12px 0 0; color: #555;">"${message}"</p>
            </div>
            <a href="https://www.carmarket365.com/private-dashboard" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              View & Respond
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `New inquiry for "${carTitle}" from ${inquirerName} (${inquirerEmail}): "${message}". Log in to respond: https://www.carmarket365.com/private-dashboard`,
    });
  }

  async sendSearchAlertEmail(email: string, alertName: string, newCars: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `${newCars} new cars match your alert: ${alertName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">New Cars Found!</h2>
            <p style="color: #555; line-height: 1.6;">
              We found <strong>${newCars} new car${newCars > 1 ? 's' : ''}</strong> matching your search alert "<strong>${alertName}</strong>".
            </p>
            <a href="https://www.carmarket365.com/cars" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              View Matches
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `${newCars} new cars match your alert "${alertName}". View them at https://www.carmarket365.com/cars`,
    });
  }
}
