import { Inject, Injectable } from '@nestjs/common';

import { PasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';

import { BcryptService, EncryptionService } from '@tractr/nestjs-bcrypt';

@Injectable()
export class HashService implements EncryptionService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly passwordModuleOptions: PasswordModuleOptions,
    private readonly bcryptService: BcryptService,
  ) {}

  get encryptionService(): EncryptionService {
    return this.passwordModuleOptions.encryptionService || this.bcryptService;
  }

  async hash(value: string): Promise<string> {
    return this.encryptionService.hash(value);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return this.encryptionService.compare(value, hash);
  }
}
