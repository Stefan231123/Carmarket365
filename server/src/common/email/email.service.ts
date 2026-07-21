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
  private readonly fromAddress = process.env.FROM_EMAIL || 'CarMarket365 <noreply@carmarket365.com>';
  private readonly contactEmail = process.env.CONTACT_EMAIL;
  private readonly frontendUrl = process.env.FRONTEND_URL || 'https://www.carmarket365.com';

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.logger.log('Resend email service initialized');
    } else {
      this.logger.warn('RESEND_API_KEY not set — emails will be logged to console only');
    }
  }

  private escapeHtml(input?: string | null): string {
    if (input === undefined || input === null) return '';
    return String(input)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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

  async subscribeToAudience(email: string): Promise<boolean> {
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId || !this.resend) {
      this.logger.log(`[DEV] Would subscribe ${email} to mobile app audience`);
      return true;
    }

    try {
      const { error } = await this.resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });

      if (error) {
        this.logger.warn(`Failed to add ${email} to audience: ${error.message}`);
        return false;
      }

      // Send confirmation email to subscriber
      await this.sendEmail({
        to: email,
        subject: "You're on the list — CarMarket365 Mobile App",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #000; padding: 24px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
            </div>
            <div style="padding: 32px 24px;">
              <h2 style="color: #111;">You're on the list!</h2>
              <p style="color: #555; line-height: 1.6;">
                Thanks for signing up! We'll notify you as soon as the CarMarket365 mobile app is available for download.
              </p>
              <p style="color: #555; line-height: 1.6;">
                In the meantime, you can browse thousands of car listings on our website.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${this.frontendUrl}" style="background: #2563eb; color: #fff; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Browse Cars
                </a>
              </div>
            </div>
            <div style="background: #f5f5f5; padding: 16px 24px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                © 2025 CarMarket365. You received this because you signed up for mobile app notifications.
              </p>
            </div>
          </div>
        `,
        text: `You're on the list! We'll notify you when the CarMarket365 mobile app launches.`,
      });

      this.logger.log(`Subscribed ${email} to mobile app audience`);
      return true;
    } catch (err) {
      this.logger.error(`Error subscribing to audience: ${err}`);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const safeName = this.escapeHtml(name);
    return this.sendEmail({
      to: email,
      subject: 'Welcome to CarMarket365!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Welcome${safeName ? ', ' + safeName : ''}!</h2>
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
            <a href="${this.frontendUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              Start Browsing
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Welcome${name ? ', ' + name : ''}! Thank you for joining CarMarket365. Start browsing at ${this.frontendUrl}`,
    });
  }

  async sendVerificationEmail(email: string, name: string, verificationToken: string): Promise<boolean> {
    const verifyUrl = `${this.frontendUrl}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    const safeName = this.escapeHtml(name);

    return this.sendEmail({
      to: email,
      subject: 'Verify your CarMarket365 email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Verify Your Email</h2>
            <p style="color: #555; line-height: 1.6;">
              Hi${safeName ? ' ' + safeName : ''},
            </p>
            <p style="color: #555; line-height: 1.6;">
              Please verify your email address to get full access to CarMarket365. Click the button below:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 40px; border-radius: 24px; text-decoration: none; font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p style="color: #999; font-size: 13px; line-height: 1.6;">
              This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Verify your CarMarket365 email: ${verifyUrl}\n\nThis link expires in 24 hours. If you didn't create this account, ignore this email.`,
    });
  }

  async sendInquiryNotification(
    sellerEmail: string,
    carTitle: string,
    inquirerName: string,
    inquirerEmail: string,
    message: string,
    inquirerPhone?: string,
  ): Promise<boolean> {
    const safeCarTitle = this.escapeHtml(carTitle);
    const safeInquirerName = this.escapeHtml(inquirerName);
    const safeInquirerEmail = this.escapeHtml(inquirerEmail);
    const safeInquirerPhone = this.escapeHtml(inquirerPhone);
    const safeMessage = this.escapeHtml(message);
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
              Someone is interested in your car listing: <strong>${safeCarTitle}</strong>
            </p>
            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 8px; color: #333;"><strong>From:</strong> ${safeInquirerName}</p>
              <p style="margin: 0 0 8px; color: #333;"><strong>Email:</strong> ${safeInquirerEmail}</p>
              ${safeInquirerPhone ? `<p style="margin: 0 0 8px; color: #333;"><strong>Phone:</strong> ${safeInquirerPhone}</p>` : ''}
              <p style="margin: 12px 0 0; color: #555;">"${safeMessage}"</p>
            </div>
            <a href="${this.frontendUrl}/private-dashboard" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              View & Respond
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `New inquiry for "${carTitle}" from ${inquirerName} (${inquirerEmail})${inquirerPhone ? `, Phone: ${inquirerPhone}` : ''}: "${message}". Log in to respond: ${this.frontendUrl}/private-dashboard`,
    });
  }

  async sendContactFormEmail(
    name: string,
    email: string,
    phone: string | undefined,
    subject: string,
    inquiryType: string,
    message: string,
  ): Promise<boolean> {
    const safeName = this.escapeHtml(name);
    const safeEmail = this.escapeHtml(email);
    const safePhone = this.escapeHtml(phone);
    const safeInquiryType = this.escapeHtml(inquiryType);
    const safeSubject = this.escapeHtml(subject);
    const safeMessage = this.escapeHtml(message);
    return this.sendEmail({
      to: (() => {
        if (!this.contactEmail) {
          this.logger.error('CONTACT_EMAIL environment variable is not set. Contact form email cannot be sent.');
          throw new Error('CONTACT_EMAIL environment variable is required.');
        }
        return this.contactEmail;
      })(),
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">New Contact Form Submission</h2>
            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 8px; color: #333;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin: 0 0 8px; color: #333;"><strong>Email:</strong> ${safeEmail}</p>
              ${safePhone ? `<p style="margin: 0 0 8px; color: #333;"><strong>Phone:</strong> ${safePhone}</p>` : ''}
              <p style="margin: 0 0 8px; color: #333;"><strong>Inquiry Type:</strong> ${safeInquiryType}</p>
              <p style="margin: 0 0 8px; color: #333;"><strong>Subject:</strong> ${safeSubject}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
              <p style="margin: 0; color: #555; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            <p style="color: #999; font-size: 12px;">Reply directly to this email to respond to the sender at ${safeEmail}</p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `New contact from ${name} (${email})${phone ? `, Phone: ${phone}` : ''}\nType: ${inquiryType}\nSubject: ${subject}\n\n${message}`,
    });
  }

  async sendPasswordResetEmail(email: string, name: string, resetToken: string): Promise<boolean> {
    const resetUrl = `${this.frontendUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const safeName = this.escapeHtml(name);

    return this.sendEmail({
      to: email,
      subject: 'Reset Your CarMarket365 Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Reset Your Password</h2>
            <p style="color: #555; line-height: 1.6;">
              Hi${safeName ? ' ' + safeName : ''},
            </p>
            <p style="color: #555; line-height: 1.6;">
              We received a request to reset your password. Click the button below to create a new password:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 40px; border-radius: 24px; text-decoration: none; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p style="color: #999; font-size: 13px; line-height: 1.6;">
              This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Reset your CarMarket365 password: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.`,
    });
  }

  async sendListingLiveEmail(email: string, name: string, carTitle: string, carId: string): Promise<boolean> {
    const carUrl = `${this.frontendUrl}/cars/${carId}`;
    const safeName = this.escapeHtml(name);
    const safeCarTitle = this.escapeHtml(carTitle);
    return this.sendEmail({
      to: email,
      subject: `Your listing is live: ${carTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Your listing is live!</h2>
            <p style="color: #555; line-height: 1.6;">Hi${safeName ? ' ' + safeName : ''},</p>
            <p style="color: #555; line-height: 1.6;">
              Your car <strong>${safeCarTitle}</strong> is now live on CarMarket365 and visible to thousands of buyers.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${carUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 40px; border-radius: 24px; text-decoration: none; font-weight: bold;">
                View Your Listing
              </a>
            </div>
            <p style="color: #999; font-size: 13px; line-height: 1.6;">
              You can edit or remove your listing at any time from your dashboard.
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Your listing "${carTitle}" is now live on CarMarket365. View it here: ${carUrl}`,
    });
  }

  async sendPriceDropEmail(
    email: string,
    name: string,
    carTitle: string,
    oldPrice: number,
    newPrice: number,
    carId: string,
  ): Promise<boolean> {
    const carUrl = `${this.frontendUrl}/cars/${carId}`;
    const savings = Math.round(oldPrice - newPrice);
    const pct = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    const safeName = this.escapeHtml(name);
    const safeCarTitle = this.escapeHtml(carTitle);
    return this.sendEmail({
      to: email,
      subject: `Price drop on a saved car: ${carTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Price dropped on a car you saved!</h2>
            <p style="color: #555; line-height: 1.6;">Hi${safeName ? ' ' + safeName : ''},</p>
            <p style="color: #555; line-height: 1.6;">
              The price on <strong>${safeCarTitle}</strong>, which you saved, has been reduced.
            </p>
            <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 4px; color: #999; text-decoration: line-through; font-size: 18px;">€${oldPrice.toLocaleString()}</p>
              <p style="margin: 0; color: #16a34a; font-size: 28px; font-weight: bold;">€${newPrice.toLocaleString()}</p>
              <p style="margin: 8px 0 0; color: #16a34a; font-size: 14px;">Save €${savings.toLocaleString()} (${pct}% off)</p>
            </div>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${carUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 40px; border-radius: 24px; text-decoration: none; font-weight: bold;">
                View Listing
              </a>
            </div>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Price drop on "${carTitle}": was €${oldPrice.toLocaleString()}, now €${newPrice.toLocaleString()} (save €${savings.toLocaleString()}). View: ${carUrl}`,
    });
  }

  async sendSavedCarUnavailableEmail(email: string, name: string, carTitle: string): Promise<boolean> {
    const safeName = this.escapeHtml(name);
    const safeCarTitle = this.escapeHtml(carTitle);
    return this.sendEmail({
      to: email,
      subject: `A saved car is no longer available: ${carTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">A saved car is no longer available</h2>
            <p style="color: #555; line-height: 1.6;">Hi${safeName ? ' ' + safeName : ''},</p>
            <p style="color: #555; line-height: 1.6;">
              Unfortunately, <strong>${safeCarTitle}</strong>, which you had saved, has been removed from CarMarket365.
            </p>
            <p style="color: #555; line-height: 1.6;">
              There are thousands of other cars waiting for you — find your next match below.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${this.frontendUrl}/cars" style="display: inline-block; background: #000; color: #fff; padding: 14px 40px; border-radius: 24px; text-decoration: none; font-weight: bold;">
                Browse Cars
              </a>
            </div>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `"${carTitle}", which you had saved on CarMarket365, has been removed. Browse more cars: ${this.frontendUrl}/cars`,
    });
  }

  async sendContactAutoReplyEmail(email: string, name: string): Promise<boolean> {
    const safeName = this.escapeHtml(name);
    return this.sendEmail({
      to: email,
      subject: "We've received your message — CarMarket365",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">We got your message!</h2>
            <p style="color: #555; line-height: 1.6;">Hi${safeName ? ' ' + safeName : ''},</p>
            <p style="color: #555; line-height: 1.6;">
              Thanks for reaching out. We've received your message and will get back to you as soon as possible.
            </p>
            <p style="color: #555; line-height: 1.6;">
              In the meantime, feel free to browse our listings.
            </p>
            <a href="${this.frontendUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              Browse Cars
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Hi${name ? ' ' + name : ''}, we've received your message and will get back to you shortly.`,
    });
  }

  async sendPasswordChangedEmail(email: string, name: string): Promise<boolean> {
    const safeName = this.escapeHtml(name);
    return this.sendEmail({
      to: email,
      subject: 'Your CarMarket365 password has been changed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">Password Changed</h2>
            <p style="color: #555; line-height: 1.6;">Hi${safeName ? ' ' + safeName : ''},</p>
            <p style="color: #555; line-height: 1.6;">
              Your CarMarket365 password was successfully changed. If you made this change, no further action is needed.
            </p>
            <p style="color: #555; line-height: 1.6;">
              If you didn't change your password, your account may be compromised. Please
              <a href="${this.frontendUrl}/reset-password" style="color: #2563eb;">reset your password immediately</a>
              and contact support.
            </p>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `Your CarMarket365 password was successfully changed. If you didn't do this, reset your password immediately at ${this.frontendUrl}/reset-password`,
    });
  }

  async sendInquiryReplyEmail(
    inquirerEmail: string,
    inquirerName: string,
    carTitle: string,
    response: string,
    carId: string,
  ): Promise<boolean> {
    const carUrl = `${this.frontendUrl}/cars/${carId}`;
    const safeInquirerName = this.escapeHtml(inquirerName);
    const safeCarTitle = this.escapeHtml(carTitle);
    const safeResponse = this.escapeHtml(response);
    return this.sendEmail({
      to: inquirerEmail,
      subject: `Reply to your inquiry: ${carTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">CarMarket365</h1>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #111;">The seller has replied to your inquiry</h2>
            <p style="color: #555; line-height: 1.6;">Hi${safeInquirerName ? ' ' + safeInquirerName : ''},</p>
            <p style="color: #555; line-height: 1.6;">
              The seller of <strong>${safeCarTitle}</strong> has responded to your inquiry:
            </p>
            <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #000;">
              <p style="margin: 0; color: #333; line-height: 1.6;">"${safeResponse}"</p>
            </div>
            <a href="${carUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              View Listing
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `The seller of "${carTitle}" has replied to your inquiry: "${response}". View the listing: ${carUrl}`,
    });
  }

  async sendSearchAlertEmail(email: string, alertName: string, newCars: number): Promise<boolean> {
    const safeAlertName = this.escapeHtml(alertName);
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
              We found <strong>${newCars} new car${newCars > 1 ? 's' : ''}</strong> matching your search alert "<strong>${safeAlertName}</strong>".
            </p>
            <a href="${this.frontendUrl}/cars" style="display: inline-block; background: #000; color: #fff; padding: 12px 32px; border-radius: 24px; text-decoration: none; margin-top: 16px;">
              View Matches
            </a>
          </div>
          <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; color: #999; font-size: 12px;">
            &copy; ${new Date().getFullYear()} CarMarket365. All rights reserved.
          </div>
        </div>
      `,
      text: `${newCars} new cars match your alert "${alertName}". View them at ${this.frontendUrl}/cars`,
    });
  }
}
