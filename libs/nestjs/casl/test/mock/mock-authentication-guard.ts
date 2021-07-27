import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export function mockAuthenticationGuard({
  getUser,
  isPublic,
}: {
  getUser: () => Record<string, unknown> | null;
  isPublic: () => boolean;
}) {
  return class implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      if (isPublic()) return true;

      const req = context.switchToHttp().getRequest();
      const user = getUser();

      if (user === null) throw new UnauthorizedException();

      req.user = user;

      return true;
    }
  };
}
