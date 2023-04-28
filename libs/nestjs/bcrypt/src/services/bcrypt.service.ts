import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { MODULE_OPTIONS_TOKEN } from '../bcrypt.module-definition';
import { BcryptModuleOptions, EncryptionService } from '../interfaces';

@Injectable()
export class BcryptService implements EncryptionService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly bcryptModuleOptions: BcryptModuleOptions,
  ) {}

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async hash(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this.bcryptModuleOptions.saltRounds || 10,
    );
    return bcrypt.hash(plaintext, salt);
  }

  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}
