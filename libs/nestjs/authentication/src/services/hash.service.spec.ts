/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { HashService } from './hash.service';
import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { AuthenticationModuleOptions } from '../interfaces';

import { BcryptService } from '@trxn/nestjs-bcrypt';

describe('HashService', () => {
  let hashService: HashService;
  let mockAuthenticationModuleOptions: MockProxy<AuthenticationModuleOptions>;
  let mockBcryptService: MockProxy<BcryptService>;

  beforeEach(async () => {
    mockAuthenticationModuleOptions = mockDeep<AuthenticationModuleOptions>(
      {},
    ) as MockProxy<AuthenticationModuleOptions>;
    mockBcryptService = mockDeep<BcryptService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: mockAuthenticationModuleOptions,
        },
        { provide: BcryptService, useValue: mockBcryptService },
      ],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  afterEach(() => {
    mockReset(mockAuthenticationModuleOptions);
    mockReset(mockBcryptService);
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('compare', () => {
    it('should use the default BcryptService if no config is provided', async () => {
      mockAuthenticationModuleOptions.encryptionService = undefined;
      await hashService.compare('test', 'hash');
      expect(mockBcryptService.compare).toHaveBeenCalledWith('test', 'hash');
    });
    it('should use the EncryptionService if a config has been used', async () => {
      const encryptionService = mockDeep<BcryptService>();
      mockAuthenticationModuleOptions.encryptionService = encryptionService;

      await hashService.compare('test', 'hash');
      expect(mockBcryptService.compare).toHaveBeenCalledTimes(0);
      expect(encryptionService.compare).toHaveBeenCalledWith('test', 'hash');
    });
  });
  describe('hash', () => {
    it('should use the default BcryptService if no config is provided', async () => {
      mockAuthenticationModuleOptions.encryptionService = undefined;
      await hashService.hash('test');
      expect(mockBcryptService.hash).toHaveBeenCalledWith('test');
    });
    it('should use the EncryptionService if a config has been used', async () => {
      const encryptionService = mockDeep<BcryptService>();
      mockAuthenticationModuleOptions.encryptionService = encryptionService;

      await hashService.hash('test');
      expect(mockBcryptService.hash).toHaveBeenCalledTimes(0);
      expect(encryptionService.hash).toHaveBeenCalledWith('test');
    });
  });
});
