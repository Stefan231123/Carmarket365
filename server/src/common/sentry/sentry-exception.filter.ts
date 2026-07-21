import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';
import { Sentry } from './sentry.service';

@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SentryExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : 500;

    // Report unexpected errors (5xx / non-HTTP) to Sentry; 4xx are expected.
    if (!isHttpException || status >= 500) {
      if (process.env.SENTRY_DSN) {
        Sentry.captureException(exception);
      }
      this.logger.error(
        exception instanceof Error ? exception.message : 'Unknown error',
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    // GraphQL has no HTTP response object — rethrow so Apollo formats the error.
    if (host.getType<string>() === 'graphql') {
      throw exception;
    }

    // REST: send the response ourselves. Rethrowing here would escape Nest and
    // make Express emit a bare status with no body, which hides the reason for
    // every REST error (e.g. why an upload presign was rejected).
    const response = host.switchToHttp().getResponse<Response>();
    if (!response || typeof response.status !== 'function') {
      throw exception;
    }

    const payload = isHttpException
      ? exception.getResponse()
      : { statusCode: 500, message: 'Internal server error' };

    response
      .status(status)
      .json(typeof payload === 'string' ? { statusCode: status, message: payload } : payload);
  }
}
