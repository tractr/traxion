import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { GqlArgumentsHost, GqlExecutionContext } from '@nestjs/graphql';

/**
 * Extract Request object from the nestjs context and abstract the
 * context type (http or graphql)
 *
 * @param context - Nestjs execution context
 * @returns the request object extracted from the context
 */
export function getRequestFromContext(
  context: ExecutionContext | ArgumentsHost,
) {
  const contextType: string = context.getType();
  switch (contextType) {
    case 'http':
      return context.switchToHttp().getRequest();
    case 'graphql':
      return (
        'getClass' in context
          ? GqlExecutionContext.create(context)
          : GqlArgumentsHost.create(context)
      ).getContext().req;
    default:
      throw new Error(`Context type ${contextType} is not handled`);
  }
}

/**
 * Extract Request object from the nestjs context and abstract the
 * context type (http or graphql)
 *
 * @param context - Nestjs execution context
 * @returns the request object extracted from the context
 */
export function getResponseFromContext(
  context: ExecutionContext | ArgumentsHost,
) {
  const contextType: string = context.getType();
  switch (contextType) {
    case 'http':
      return context.switchToHttp().getResponse();
    case 'graphql':
      return (
        'getClass' in context
          ? GqlExecutionContext.create(context)
          : GqlArgumentsHost.create(context)
      ).getContext().res;
    default:
      throw new Error(`Context type ${contextType} is not handled`);
  }
}
