import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

import { CaslAbilityFactoryService } from '../services';

import { isClass, PolicyHandlerType } from '@trxn/common';
import {
  getRequestFromContext,
  POLICIES_KEY,
  shouldSkipGlobalGuard,
} from '@trxn/nestjs-core';
import { MinimalUser, User } from '@trxn/nestjs-user';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactoryService,
  ) {}

  async canActivate<U extends User = MinimalUser>(
    context: ExecutionContext,
  ): Promise<boolean> {
    if (shouldSkipGlobalGuard(context, this.reflector)) return true;

    const policyHandlers =
      this.reflector.get<PolicyHandlerType<unknown>[]>(
        POLICIES_KEY,
        context.getHandler(),
      ) || [];

    // Extract request from the context
    const req = getRequestFromContext(context);

    // Get user from the request object.
    // User should have been fetched and hydrated by the authentication layer
    const { user }: { user?: U } = req;

    if (user) {
      try {
        this.caslAbilityFactory.getRoles(user);
      } catch {
        throw new ForbiddenException();
      }
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

    throw new Error('Policy handler must be a class or a function');
  }
}
