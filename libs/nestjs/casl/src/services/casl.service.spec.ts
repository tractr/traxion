import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockDeep, MockProxy } from 'jest-mock-extended';

import { CaslAbilityFactoryService } from './casl.service';
import {
  publicPermissions,
  rolePermissions,
} from '../../mocks/role-permission.mock';
import { MODULE_OPTIONS_TOKEN } from '../casl.module-definition';
import {
  DefinePublicPermissions,
  RolePermissions,
  UntypedCaslModuleOptions,
} from '../interfaces';

describe('CaslService', () => {
  let caslAbilityFactoryService: CaslAbilityFactoryService;
  let mockCaslOptions: MockProxy<UntypedCaslModuleOptions>;

  beforeEach(async () => {
    mockCaslOptions = mockDeep<UntypedCaslModuleOptions>(
      {
        funcPropSupport: true,
      },
      {
        rolePermissions: mockDeep(
          rolePermissions,
        ) as unknown as RolePermissions<
          string,
          AbilityBuilder<AnyAbility>,
          Record<string, unknown>
        >,
        getRoles: (user) => user.roles as string[],
      },
    );

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        CaslAbilityFactoryService,
        {
          provide: MODULE_OPTIONS_TOKEN,
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
      const userAdmin = {
        id: 'admin',
        roles: ['admin'],
      };

      const abilities = caslAbilityFactoryService.createForUser(userAdmin);

      expect(abilities).toBeDefined();
    });

    it('should throw an error if no user is passed and no publicPermissions are defined', async () => {
      mockCaslOptions.publicPermissions = undefined;
      expect(() => caslAbilityFactoryService.createForUser()).toThrow(
        UnauthorizedException,
      );
    });

    it('should not throw an error if no user is passed and but a publicPermissions is used', async () => {
      mockCaslOptions.publicPermissions =
        publicPermissions as unknown as DefinePublicPermissions<
          AbilityBuilder<AnyAbility>
        >;

      const abilities = caslAbilityFactoryService.createForUser();
      expect(abilities).toBeDefined();
    });

    it('should configure no access if a role does not exists', async () => {
      mockCaslOptions.rolePermissions = mockDeep(
        rolePermissions,
      ) as unknown as RolePermissions<
        string,
        AbilityBuilder<AnyAbility>,
        Record<string, unknown>
      >;

      const userWithAWrongRole = {
        id: 'admin',
        roles: ['not-exists'],
      };

      const abilities =
        caslAbilityFactoryService.createForUser(userWithAWrongRole);

      expect(abilities).toBeDefined();
      expect(abilities.cannot('manage', 'all')).toEqual(true);
    });
  });
});
