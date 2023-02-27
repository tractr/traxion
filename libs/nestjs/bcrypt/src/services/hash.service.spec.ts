/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { mockDeep, MockProxy, mockReset } from 'jest-mock-extended';

import { BcryptService } from './bcrypt.service';
import { MODULE_OPTIONS_TOKEN } from '../bcrypt.module-definition';
import { BcryptModuleOptions } from '../interfaces';

describe('BcryptService', () => {
  let bcryptService: BcryptService;
  let mockBcryptModuleOptions: MockProxy<BcryptModuleOptions>;

  let spyCompare: jest.SpyInstance;
  let genSalt: jest.SpyInstance;
  let spyHash: jest.SpyInstance;

  beforeEach(async () => {
    spyCompare = jest.spyOn(bcrypt, 'compare');
    genSalt = jest.spyOn(bcrypt, 'genSalt');
    spyHash = jest.spyOn(bcrypt, 'hash');
    mockBcryptModuleOptions = mockDeep<BcryptModuleOptions>({});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BcryptService,
        { provide: MODULE_OPTIONS_TOKEN, useValue: mockBcryptModuleOptions },
      ],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  afterEach(() => {
    mockReset(mockBcryptModuleOptions);
    spyCompare.mockRestore();
    genSalt.mockRestore();
    spyHash.mockRestore();
  });

  it('should be defined', () => {
    expect(bcryptService).toBeDefined();
  });

  describe('compare', () => {
    it('should use bcrypt to compare the password', async () => {
      await bcryptService.compare('test', 'hash');
      expect(spyCompare).toHaveBeenCalledTimes(1);
      expect(spyCompare).toHaveBeenCalledWith('test', 'hash');
    });
  });
  describe('hash', () => {
    it('should use bcrypt to hash the password', async () => {
      const salt = await bcrypt.genSalt(10);
      genSalt.mockResolvedValue(salt);
      await bcryptService.hash('test');
      expect(spyHash).toHaveBeenCalledTimes(1);
      expect(spyHash).toHaveBeenCalledWith('test', salt);
      expect(genSalt).toHaveBeenCalledWith(10);
    });

    it('should use bcrypt to hash the password and use the saltRounds from the config', async () => {
      const salt = await bcrypt.genSalt(12);
      mockBcryptModuleOptions.saltRounds = 12;
      genSalt.mockResolvedValue(salt);
      await bcryptService.hash('test');
      expect(spyHash).toHaveBeenCalledTimes(1);
      expect(spyHash).toHaveBeenCalledWith('test', salt);
      expect(genSalt).toHaveBeenCalledWith(12);
    });
  });
});
