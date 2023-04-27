import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { getRequestFromContext, IS_PUBLIC_KEY } from '@trxn/nestjs-core';

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
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  handleRequest<User>(
    err: unknown | undefined,
    user: User | undefined,
    _info: unknown,
    context: ExecutionContext,
  ) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err) {
      if (err instanceof BadRequestException) {
        throw new UnauthorizedException();
      }
      throw err;
    }

    if (!user) {
      // Check if the route is public
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      // If the route is public, request is authorized with a null user
      if (isPublic) return null;

      // Else, public access is not authorized
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
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  getRequest(context: ExecutionContext): unknown {
    return getRequestFromContext(context);
  }
}
