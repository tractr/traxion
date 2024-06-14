import { ExecutionContext } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';

export function hasUnderlyingGuards(
  context: ExecutionContext,
  reflector: Reflector,
) {
  const useGuardOverriding = reflector.getAllAndOverride(GUARDS_METADATA, [
    context.getHandler(),
    context.getClass(),
  ]);

  // If we have other guard in the called method we get to them directly
  if (useGuardOverriding && useGuardOverriding.length > 0) return true;

  return false;
}

export function isRabbitMQ(context: ExecutionContext) {
  const contextType: string = context.getType();

  // Skip the guard for rabbitmq requests
  if (contextType === 'rmq') return true;

  return false;
}

/**
 * Check if the request should skip the global guard
 *
 * It return true if the request is a rabbitmq request or if the underlying
 * method has guards configured with the @UseGuards() decorator directly on the class
 *
 * @param context
 * @param reflector
 * @returns
 */
export function shouldSkipGlobalGuard(
  context: ExecutionContext,
  reflector: Reflector,
) {
  return isRabbitMQ(context) || hasUnderlyingGuards(context, reflector);
}
