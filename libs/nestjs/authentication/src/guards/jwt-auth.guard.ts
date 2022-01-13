import { HttpResponseBase } from '@angular/common/http';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { getRequestFromContext, IS_PUBLIC_KEY } from '@tractr/nestjs-core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(protected readonly reflector: Reflector) {
    super();
  }

  /**
   * Determine if the request is authenticated by JWT token
   *
   * @param context - Nestjs execution context
   * @returns true if the request is authenticated, else return false
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If we have the @Public decorator on our route we just let pass the request
    if (isPublic) return true;

    // Check request authentication by using the passport JwtAuthGuard
    return super.canActivate(context);
  }

  /**
   * Specify an error handler for the request
   *
   * @param err
   * @param user
   * @returns
   */
  handleRequest<User>(
    err: HttpResponseBase | undefined,
    user: User | undefined,
  ) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      if (err.status === 400) throw new UnauthorizedException();
      throw err;
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * Accessor to extract the request object from the nestjs context
   *
   * @param context - Nestjs execution context
   * @returns the request object
   */
  getRequest(context: ExecutionContext): unknown {
    return getRequestFromContext(context);
  }
}
