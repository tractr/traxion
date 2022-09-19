import { Module } from '@nestjs/common';

import { rolePermissions } from '@tractr/generated-casl';
import { CaslModule as TraxionCaslModule } from '@tractr/nestjs-casl';

@Module({
  imports: [
    TraxionCaslModule.register({
      rolePermissions,
    }),
  ],
  exports: [TraxionCaslModule],
})
export class CaslModule {}
