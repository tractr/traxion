import { ExecutionContext, Injectable } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '@tractr/nestjs-core';

@Injectable()
export class JwtGlobalAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If we have the @Public decorator on our route we juste let pass the request
    if (isPublic) return true;

    const useGuardOverriding = this.reflector.getAllAndOverride(
      GUARDS_METADATA,
      [context.getHandler(), context.getClass()],
    );

    // If we have other guard in this method we get to them directly
    if (useGuardOverriding && useGuardOverriding.length > 0) return true;

    // By default we use the JwtAuthGuard
    return super.canActivate(context);
  }
}
