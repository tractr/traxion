import { Inject, Injectable, Optional } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { ENCRYPTION_SERVICE } from '../constants';
import { MODULE_OPTIONS_TOKEN } from '../models-services.module-definition';
import { ModelsServicesModuleOptions } from '../models-services.module-options';

@Injectable()
export class EncryptionService {
  private encryptionService: EncryptionService;

  constructor(
    @Optional()
    @Inject(ENCRYPTION_SERVICE)
    externalEncryptionService: EncryptionService,
    @Inject(MODULE_OPTIONS_TOKEN) moduleOptions: ModelsServicesModuleOptions,
  ) {
    this.encryptionService =
      moduleOptions.encryptionService || externalEncryptionService;
  }

  async encrypt(value: string): Promise<string> {
    if (typeof this.encryptionService !== 'undefined')
      return this.encryptionService.encrypt(value);
    return hash(value, 10);
  }

  async compare(plainText: string, hashText: string): Promise<boolean> {
    if (typeof this.encryptionService !== 'undefined')
      return this.encryptionService.compare(plainText, hashText);
    return compare(plainText, hashText);
  }
}
