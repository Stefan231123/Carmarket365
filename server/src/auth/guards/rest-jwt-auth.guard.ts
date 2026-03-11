import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT guard for REST (HTTP) controllers.
 * Uses the standard HTTP request context — reads JWT from cookie or Authorization header.
 * Use this instead of JwtAuthGuard (which is wired for GraphQL context).
 */
@Injectable()
export class RestJwtAuthGuard extends AuthGuard('jwt') {}
