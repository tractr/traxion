/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { HashService } from './hash.service';
import { ENCRYPTION_SERVICE } from '../constants';
import { PasswordModuleOptions } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../password.module-definition';

import { BcryptService } from '@trxn/nestjs-bcrypt';

describe('HashService', () => {
  let hashService: HashService;
  let mockPasswordModuleOptions: MockProxy<PasswordModuleOptions>;
  let mockBcryptService: MockProxy<BcryptService>;
  let mockEncryptionService: MockProxy<BcryptService>;

  beforeEach(async () => {
    mockPasswordModuleOptions = mockDeep<PasswordModuleOptions>(
      {},
    ) as MockProxy<PasswordModuleOptions>;
    mockBcryptService = mockDeep<BcryptService>();
    mockEncryptionService = mockDeep<BcryptService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: mockPasswordModuleOptions,
        },
        { provide: BcryptService, useValue: mockBcryptService },
        {
          provide: ENCRYPTION_SERVICE,
          useValue: mockEncryptionService,
        },
      ],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  afterEach(() => {
    mockReset(mockPasswordModuleOptions);
    mockReset(mockBcryptService);
  });

  describe('use internal bcrypt provider', () => {
    beforeEach(async () => {
      mockPasswordModuleOptions = mockDeep<PasswordModuleOptions>({});
      mockBcryptService = mockDeep<BcryptService>();
      mockEncryptionService = mockDeep<BcryptService>();

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HashService,
          {
            provide: MODULE_OPTIONS_TOKEN,
            useValue: mockPasswordModuleOptions,
          },
          { provide: BcryptService, useValue: mockBcryptService },
        ],
      }).compile();

      hashService = module.get<HashService>(HashService);
    });
    it('should use the default BcryptService.compare', async () => {
      await hashService.compare('test', 'hash');
      expect(mockBcryptService.compare).toHaveBeenCalledWith('test', 'hash');
      expect(mockEncryptionService.compare).not.toHaveBeenCalled();
    });
    it('should use the default BcryptService.hash', async () => {
      await hashService.hash('test');
      expect(mockBcryptService.hash).toHaveBeenCalledWith('test');
      expect(mockEncryptionService.hash).not.toHaveBeenCalled();
    });
  });
  describe('use external encryption provider', () => {
    beforeEach(async () => {
      mockPasswordModuleOptions = mockDeep<PasswordModuleOptions>({});
      mockBcryptService = mockDeep<BcryptService>();
      mockEncryptionService = mockDeep<BcryptService>();

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HashService,
          {
            provide: MODULE_OPTIONS_TOKEN,
            useValue: mockPasswordModuleOptions,
          },
          { provide: BcryptService, useValue: mockBcryptService },
          {
            provide: ENCRYPTION_SERVICE,
            useValue: mockEncryptionService,
          },
        ],
      }).compile();

      hashService = module.get<HashService>(HashService);
    });
    it('should use the EncryptionService.compare', async () => {
      await hashService.compare('test', 'hash');
      expect(mockBcryptService.compare).not.toHaveBeenCalled();
      expect(mockEncryptionService.compare).toHaveBeenCalledWith(
        'test',
        'hash',
      );
    });
    it('should use the EncryptionService.hash', async () => {
      await hashService.hash('test');
      expect(mockBcryptService.hash).not.toHaveBeenCalled();
      expect(mockEncryptionService.hash).toHaveBeenCalledWith('test');
    });
  });
});
