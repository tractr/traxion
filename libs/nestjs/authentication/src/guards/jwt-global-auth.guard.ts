import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from './jwt-auth.guard';

import { shouldSkipGlobalGuard } from '@trxn/nestjs-core';

@Injectable()
export class JwtGlobalAuthGuard extends JwtAuthGuard {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (shouldSkipGlobalGuard(context, this.reflector)) return true;

    // Check request authentication by using the JwtAuthGuard
    return super.canActivate(context);
  }
}
