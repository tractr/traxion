import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { CaslAbilityFactoryService } from '../services';

import { isClass, PolicyHandlerType } from '@tractr/common';
import { Logger, POLICIES_KEY } from '@tractr/nestjs-core';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    private logger: Logger,
    private caslAbilityFactory: CaslAbilityFactoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandlerType<unknown>[]>(
        POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const req = context.switchToHttp().getRequest();

    const { user } = req;

    if (!user) {
      throw new ForbiddenException('User is not authenticated');
    }

    if (user && (!user.roles || !Array.isArray(user.roles))) {
      this.logger.error(
        'User has no roles, you can check if you have register correctly your APP_GUARDS to populate req.user before the PoliciesGuard',
      );
      throw new ForbiddenException();
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    req.abilities = ability;

    const policiesResolved = await Promise.all(
      policyHandlers.map((handler) => this.execPolicyHandler(handler, ability)),
    );

    return policiesResolved.every(Boolean);
  }

  private async execPolicyHandler(
    handler: PolicyHandlerType<unknown>,
    ability: unknown,
  ): Promise<boolean> {
    if (isClass(handler)) {
      const policyHandler = await this.moduleRef.create(handler);
      return policyHandler.handle(ability);
    }

    if (typeof handler === 'function') {
      return handler(ability);
    }

    return handler.handle(ability);
  }
}
