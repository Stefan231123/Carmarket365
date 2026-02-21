import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Sentry } from './sentry.service';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SentryExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // Don't report expected HTTP errors (4xx) to Sentry
    if (exception instanceof HttpException && exception.getStatus() < 500) {
      throw exception;
    }

    // Capture unexpected errors in Sentry
    if (process.env.SENTRY_DSN) {
      Sentry.captureException(exception);
    }

    this.logger.error(
      exception instanceof Error ? exception.message : 'Unknown error',
      exception instanceof Error ? exception.stack : undefined,
    );

    throw exception;
  }
}
