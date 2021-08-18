import { AnyAbility } from '@casl/ability';
import { DynamicModule, Module } from '@nestjs/common';

import { CASL_MODULE_OPTIONS } from './casl.constant';
import { CaslOptions } from './interfaces';
import { CaslAbilityFactoryService } from './services/casl.service';

import { CaslUser, CaslUserRoles } from '@tractr/common';
import { AsyncOptions, ModuleOptionsFactory } from '@tractr/nestjs-core';

@Module({
  controllers: [],
  providers: [CaslAbilityFactoryService],
  exports: [CaslAbilityFactoryService],
})
export class CaslModule extends ModuleOptionsFactory<CaslOptions>(
  CASL_MODULE_OPTIONS,
) {
  static register<
    R extends CaslUserRoles = CaslUserRoles,
    U extends CaslUser = { roles: [] },
    A extends AnyAbility = AnyAbility,
  >(options?: CaslOptions<R, U, A>): DynamicModule {
    return super.register(options as unknown as CaslOptions);
  }

  static registerAsync<
    R extends CaslUserRoles = CaslUserRoles,
    U extends CaslUser = { roles: [] },
    A extends AnyAbility = AnyAbility,
  >(options: AsyncOptions<CaslOptions<R, U, A>>): DynamicModule {
    return super.registerAsync(options as unknown as AsyncOptions<CaslOptions>);
  }
}
