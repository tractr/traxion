import { AbilityBuilder } from '@casl/ability';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import {
  AppAbility,
  getSelectPrismaUserQuery,
  UserWithOwnershipIds,
} from '../../casl';
import { UserModule } from './user.module';

import {
  JwtGlobalAuthGuard,
  AuthenticationModule as TrxnAuthenticationModule,
} from '@trxn/nestjs-authentication';
import { Action, CaslModule, PoliciesGuard } from '@trxn/nestjs-casl';

@Module({
  imports: [
    CaslModule.register({
      getRoles: () => ['user'],
      rolePermissions: {
        user: (
          ability: AbilityBuilder<AppAbility>,
          user: UserWithOwnershipIds,
        ) => {
          ability.can(Action.Read, 'User', { id: user.id });
          ability.can(Action.Read, 'Role', { id: user.role.id });
          ability.can(Action.Read, 'Right', {
            id: { in: user.role.rights.map(({ id }) => id) },
          });
        },
      },
    }),
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      customSelect: getSelectPrismaUserQuery(),
      jwtModuleOptions: {
        secret: 'secret',
      },
    }),
  ],
  exports: [TrxnAuthenticationModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
  ],
})
export class AuthenticationModule {}
