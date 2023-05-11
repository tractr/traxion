import { AbilityBuilder } from '@casl/ability';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from './user.module';
import { getSelectPrismaUserQuery } from '../../casl/helpers';
import { AppAbility, UserWithOwnershipIds } from '../../casl/types';
import { userOwnershipPermission } from '../../casl/user-default-permissions';

import {
  JwtGlobalAuthGuard,
  AuthenticationModule as TrxnAuthenticationModule,
} from '@trxn/nestjs-authentication';
import {
  Action,
  CaslExceptionInterceptor,
  CaslModule,
  PoliciesGuard,
} from '@trxn/nestjs-casl';

const customSelect = getSelectPrismaUserQuery();

@Module({
  imports: [
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      customSelect: {
        ...customSelect,
        role: {
          select: {
            ...customSelect.role.select,
            name: true,
          },
        },
      },
      jwtModuleOptions: {
        secret: 'secret',
      },
    }),
    CaslModule.register({
      getRoles(user) {
        return [user.role.name];
      },
      rolePermissions: {
        admin: (abilities: AbilityBuilder<AppAbility>) => {
          abilities.can(Action.Manage, 'all');
        },
        user: (
          abilities: AbilityBuilder<AppAbility>,
          user: UserWithOwnershipIds & { role: { name: string } },
        ) => {
          userOwnershipPermission(abilities, user);
        },
      },
      publicPermissions: (abilities: AbilityBuilder<AppAbility>) => {
        abilities.cannot(Action.Count, 'all');
        abilities.cannot(Action.Create, 'all');
        abilities.cannot(Action.Delete, 'all');
        abilities.cannot(Action.Manage, 'all');
        abilities.cannot(Action.Read, 'all');
        abilities.cannot(Action.Search, 'all');
        abilities.cannot(Action.Update, 'all');
      },
    }),
  ],
  exports: [TrxnAuthenticationModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
})
export class AuthenticationModule {}
