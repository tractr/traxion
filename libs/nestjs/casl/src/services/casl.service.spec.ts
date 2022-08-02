import { PrismaAbility } from '@casl/prisma';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { User } from '@prisma/client';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { AppAbility, rolePermissions } from '../../mocks/role-permission.mock';
import { CASL_MODULE_OPTIONS } from '../casl.constant';
import { CaslOptions } from '../interfaces';
import { CaslAbilityFactoryService } from './casl.service';

describe('CaslService', () => {
  let caslAbilityFactoryService: CaslAbilityFactoryService;
  let mockCaslOptions: MockProxy<CaslOptions<AppAbility>>;

  beforeEach(async () => {
    mockCaslOptions = mockDeep<CaslOptions<AppAbility>>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CaslAbilityFactoryService,
        {
          provide: CASL_MODULE_OPTIONS,
          useValue: mockCaslOptions,
        },
      ],
    }).compile();

    caslAbilityFactoryService = moduleFixture.get<CaslAbilityFactoryService>(
      CaslAbilityFactoryService,
    );
  });

  it('should be defined', () => {
    expect(caslAbilityFactoryService).toBeDefined();
  });

  describe('createForUser', () => {
    it('should create a abitily from a rolePermission configuration', async () => {
      mockCaslOptions.rolePermissions = mockDeep(rolePermissions);

      const userAdmin = {
        id: 'admin',
        roles: ['admin'],
      } as User;

      const abilities = caslAbilityFactoryService.createForUser(userAdmin);

      expect(abilities).toBeDefined();
      expect(abilities).toBeInstanceOf(PrismaAbility);
    });

    it('should throw an error if no user is passed and no guest permissions is defined', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { guest, ...permissionsWithoutGuest } = rolePermissions;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockCaslOptions.rolePermissions = permissionsWithoutGuest as any;

      expect(() => caslAbilityFactoryService.createForUser(undefined)).toThrow(
        UnauthorizedException,
      );
    });

    it('should configure no access if a role does not exists', async () => {
      mockCaslOptions.rolePermissions = mockDeep(rolePermissions);

      const userWithAWrongRole = {
        id: 'admin',
        roles: ['not-exists'],
      } as unknown as User;

      const abilities =
        caslAbilityFactoryService.createForUser(userWithAWrongRole);

      expect(abilities).toBeDefined();
      expect(abilities).toBeInstanceOf(PrismaAbility);
      expect(abilities.cannot('manage', 'all')).toEqual(true);
    });

    it('should default to the guest role if no user is provided', async () => {
      mockCaslOptions.rolePermissions = mockDeep(rolePermissions);

      const abilities = caslAbilityFactoryService.createForUser();

      expect(abilities).toBeDefined();
      expect(abilities).toBeInstanceOf(PrismaAbility);
      expect(abilities.can('read', 'Tag')).toEqual(true);
      expect(abilities.cannot('read', 'User')).toEqual(true);
    });
  });
});
