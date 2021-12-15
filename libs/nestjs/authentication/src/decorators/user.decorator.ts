import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Get the user from the request
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    console.error('CurrentUser is deprecated, use @User() instead');
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

/**
 * Get the user from the request in GraphQL
 */
export const CurrentGqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.error('CurrentGqlUser is deprecated, use @GqlUser() instead');
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
