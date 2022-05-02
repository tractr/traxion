import { ExecutionContext, Injectable } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class JwtGlobalAuthGuard extends JwtAuthGuard {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextType: string = context.getType();

    // Skip the guard for rabbitmq requests
    if (contextType === 'rmq') return true;

    const useGuardOverriding = this.reflector.getAllAndOverride(
      GUARDS_METADATA,
      [context.getHandler(), context.getClass()],
    );

    // If we have other guard in the called method we get to them directly
    if (useGuardOverriding && useGuardOverriding.length > 0) return true;

    // Check request authentication by using the JwtAuthGuard
    return super.canActivate(context);
  }
}
