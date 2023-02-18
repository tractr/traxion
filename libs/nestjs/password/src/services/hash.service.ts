import { Inject, Injectable, Optional } from '@nestjs/common';

import { ENCRYPTION_SERVICE } from '../constants';

import { BcryptService, EncryptionService } from '@trxn/nestjs-bcrypt';

@Injectable()
export class HashService implements EncryptionService {
  constructor(
    private readonly bcryptService: BcryptService,

    @Optional()
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: EncryptionService,
  ) {
    this.encryptionService = this.encryptionService || this.bcryptService;
  }

  async hash(value: string): Promise<string> {
    return this.encryptionService.hash(value);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return this.encryptionService.compare(value, hash);
  }
}
