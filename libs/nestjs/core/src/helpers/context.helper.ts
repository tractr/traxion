import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { GqlArgumentsHost, GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

/**
 * Extract Request object from the nestjs context and abstract the
 * context type (http or graphql)
 *
 * @param context - Nestjs execution context
 * @returns the request object extracted from the context
 */
export function getRequestFromContext<T extends Request>(
  context: ExecutionContext | ArgumentsHost,
): T {
  const contextType: string = context.getType();
  switch (contextType) {
    case 'http':
      return context.switchToHttp().getRequest();
    case 'graphql':
      if ('getClass' in context)
        return GqlExecutionContext.create(context).getContext().req;
      return GqlArgumentsHost.create(context).getContext().req;
    default:
      throw new Error(`Context type ${contextType} is not handled`);
  }
}

export function getResponseFromContext<T extends Response>(
  context: ExecutionContext | ArgumentsHost,
): T {
  const contextType: string = context.getType();
  switch (contextType) {
    case 'http':
      return context.switchToHttp().getResponse();
    case 'graphql':
      if ('getClass' in context)
        return GqlExecutionContext.create(context).getContext().res;
      return GqlArgumentsHost.create(context).getContext().res;
    default:
      throw new Error(`Context type ${contextType} is not handled`);
  }
}
