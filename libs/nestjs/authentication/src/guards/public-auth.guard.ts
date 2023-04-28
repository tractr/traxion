import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class PublicGuard implements CanActivate {
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  canActivate() {
    return true;
  }
}
