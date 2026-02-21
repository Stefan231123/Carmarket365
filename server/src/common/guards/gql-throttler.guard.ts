import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    // GraphQL resolvers get req/res from context; REST gets them from HTTP
    if (ctx.req) {
      return { req: ctx.req, res: ctx.res };
    }
    // Fallback for REST controllers
    const http = context.switchToHttp();
    return { req: http.getRequest(), res: http.getResponse() };
  }
}
