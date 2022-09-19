import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './bcrypt.module-definition';
import { BcryptService } from './services';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule extends ConfigurableModuleClass {}
