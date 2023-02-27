/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { HashService } from './hash.service';
import { MODULE_OPTIONS_TOKEN } from '../authentication.module-definition';
import { ENCRYPTION_SERVICE } from '../constants';
import { AuthenticationModuleOptions } from '../interfaces';

import { BcryptService } from '@trxn/nestjs-bcrypt';

describe('HashService', () => {
  let hashService: HashService;
  let mockAuthenticationModuleOptions: MockProxy<AuthenticationModuleOptions>;
  let mockBcryptService: MockProxy<BcryptService>;
  let mockEncryptionService: MockProxy<BcryptService>;

  beforeEach(async () => {
    mockAuthenticationModuleOptions = mockDeep<AuthenticationModuleOptions>(
      {},
    ) as MockProxy<AuthenticationModuleOptions>;
    mockBcryptService = mockDeep<BcryptService>();
    mockEncryptionService = mockDeep<BcryptService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: mockAuthenticationModuleOptions,
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
    mockReset(mockAuthenticationModuleOptions);
    mockReset(mockBcryptService);
  });

  describe('use internal bcrypt provider', () => {
    beforeEach(async () => {
      mockAuthenticationModuleOptions = mockDeep<AuthenticationModuleOptions>(
        {},
      ) as MockProxy<AuthenticationModuleOptions>;
      mockBcryptService = mockDeep<BcryptService>();
      mockEncryptionService = mockDeep<BcryptService>();

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
      mockAuthenticationModuleOptions = mockDeep<AuthenticationModuleOptions>(
        {},
      ) as MockProxy<AuthenticationModuleOptions>;
      mockBcryptService = mockDeep<BcryptService>();
      mockEncryptionService = mockDeep<BcryptService>();

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HashService,
          {
            provide: MODULE_OPTIONS_TOKEN,
            useValue: mockAuthenticationModuleOptions,
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
