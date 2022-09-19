/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { PasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';
import { HashService } from './hash.service';

import { BcryptService } from '@tractr/nestjs-bcrypt';

describe('HashService', () => {
  let hashService: HashService;
  let mockPasswordModuleOptions: MockProxy<PasswordModuleOptions>;
  let mockBcryptService: MockProxy<BcryptService>;

  beforeEach(async () => {
    mockPasswordModuleOptions = mockDeep<PasswordModuleOptions>({});
    mockBcryptService = mockDeep<BcryptService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        { provide: MODULE_OPTIONS_TOKEN, useValue: mockPasswordModuleOptions },
        { provide: BcryptService, useValue: mockBcryptService },
      ],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  afterEach(() => {
    mockReset(mockPasswordModuleOptions);
    mockReset(mockBcryptService);
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('compare', () => {
    it('should use the default BcryptService if no config is provided', async () => {
      mockPasswordModuleOptions.encryptionService = undefined;
      await hashService.compare('test', 'hash');
      expect(mockBcryptService.compare).toHaveBeenCalledWith('test', 'hash');
    });
    it('should use the EncryptionService if a config has been used', async () => {
      const encryptionService = mockDeep<BcryptService>();
      mockPasswordModuleOptions.encryptionService = encryptionService;

      await hashService.compare('test', 'hash');
      expect(mockBcryptService.compare).toHaveBeenCalledTimes(0);
      expect(encryptionService.compare).toHaveBeenCalledWith('test', 'hash');
    });
  });
  describe('hash', () => {
    it('should use the default BcryptService if no config is provided', async () => {
      mockPasswordModuleOptions.encryptionService = undefined;
      await hashService.hash('test');
      expect(mockBcryptService.hash).toHaveBeenCalledWith('test');
    });
    it('should use the EncryptionService if a config has been used', async () => {
      const encryptionService = mockDeep<BcryptService>();
      mockPasswordModuleOptions.encryptionService = encryptionService;

      await hashService.hash('test');
      expect(mockBcryptService.hash).toHaveBeenCalledTimes(0);
      expect(encryptionService.hash).toHaveBeenCalledWith('test');
    });
  });
});
