import { AbilityBuilder, AnyAbility } from '@casl/ability';
import {
  ConfigurableModuleAsyncOptions,
  DynamicModule,
  Module,
} from '@nestjs/common';

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  ExtraModuleDefinitionOptions,
  OPTIONS_TYPE,
} from './casl.module-definition';
import { CaslModuleOptions } from './interfaces';
import { CaslAbilityFactoryService } from './services/casl.service';

import { AuthenticationModule } from '@trxn/nestjs-authentication';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [CaslAbilityFactoryService],
  exports: [CaslAbilityFactoryService],
})
export class CaslModule extends ConfigurableModuleClass {
  static register<
    R extends string,
    U extends Record<string, unknown>,
    B extends AbilityBuilder<AnyAbility>,
  >(
    options: CaslModuleOptions<R, U, B> & ExtraModuleDefinitionOptions,
  ): DynamicModule {
    return super.register(options as unknown as typeof OPTIONS_TYPE);
  }

  static registerAsync<
    R extends string,
    U extends Record<string, unknown>,
    B extends AbilityBuilder<AnyAbility>,
  >(
    options: ConfigurableModuleAsyncOptions<
      CaslModuleOptions<R, U, B> & ExtraModuleDefinitionOptions
    >,
  ): DynamicModule {
    return super.registerAsync(options as typeof ASYNC_OPTIONS_TYPE);
  }
}
