import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Extract Request object from the nestjs context and abstract the
 * context type (http or graphql)
 *
 * @param context - Nestjs execution context
 * @returns the request object extracted from the context
 */
export function getRequestFromContext(context: ExecutionContext) {
  const contextType: string = context.getType();
  switch (contextType) {
    case 'http':
      return context.switchToHttp().getRequest();
    case 'graphql':
      return GqlExecutionContext.create(context).getContext().req;
    default:
      throw new Error(`Context type ${contextType} is not handled`);
  }
}
