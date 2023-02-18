import { Module } from '@nestjs/common';

import { rolePermissions } from '@trxn/generated-casl';
import { CaslModule as TraxionCaslModule } from '@trxn/nestjs-casl';

@Module({
  imports: [
    TraxionCaslModule.register({
      rolePermissions,
      getRoles: (user) => user.roles,
      publicPermissions: (ability) => {
        ability.can('read', 'all');
      },
    }),
  ],
  exports: [TraxionCaslModule],
})
export class CaslModule {}
