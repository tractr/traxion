import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import {
  formatPopulate,
  RoleCountQueryDto,
  RoleCreateBodyDto,
  RoleDeleteParamsDto,
  RoleFindManyQueryDto,
  RoleFindUniqueParamsDto,
  RoleFindUniqueQueryDto,
  RoleRestDtoService,
  RoleUpdateBodyDto,
  RoleUpdateParamsDto,
  RoleUpsertBodyDto,
  RoleUpsertParamsDto,
} from '../../../../src/generated';
import {
  mockRoleCountQueryDtoFactory,
  mockRoleCreateBodyDtoFactory,
  mockRoleDeleteParamsDtoFactory,
  mockRoleFindManyQueryDtoFactory,
  mockRoleFindUniqueParamsDtoFactory,
  mockRoleFindUniqueQueryDtoFactory,
  mockRoleUpdateBodyDtoFactory,
  mockRoleUpdateParamsDtoFactory,
  mockRoleUpsertBodyDtoFactory,
  mockRoleUpsertParamsDtoFactory,
} from '../mocks';

describe('RoleDatabaseService', () => {
  let roleRestDtoService: RoleRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleRestDtoService],
    }).compile();

    roleRestDtoService = module.get<RoleRestDtoService>(RoleRestDtoService);
  });

  it('should be defined', () => {
    expect(roleRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', () => {
      const bodyDto: Required<RoleCreateBodyDto> = mockRoleCreateBodyDtoFactory();
      const { rights, ...values } = bodyDto;
      const data = {
        ...values,
        rights: { set: rights.map((id) => ({ id })) },
      };
      const prismaArgs: Prisma.RoleCreateArgs = { data };
      const result = roleRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatCountDto', () => {
    it('should properly format count dto', () => {
      const queryDto: Required<RoleCountQueryDto> = mockRoleCountQueryDtoFactory();
      const { rights, ...values } = queryDto;
      const where = {
        ...values,
        rights: { some: { id: { in: rights } } },
      };
      const prismaArgs: Prisma.RoleCountArgs = { where };
      const result = roleRestDtoService.formatCountDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindUniqueDto', () => {
    it('should properly format findUnique dtos', () => {
      const paramsDto: RoleFindUniqueParamsDto = mockRoleFindUniqueParamsDtoFactory();
      const queryDto: RoleFindUniqueQueryDto = mockRoleFindUniqueQueryDtoFactory();
      const prismaArgs: Prisma.RoleFindUniqueArgs = {
        where: { ...paramsDto },
        include: {
          rights: true,
          userAsRole: true,
        },
      };
      const result = roleRestDtoService.formatFindUniqueDtos(
        paramsDto,
        queryDto,
      );
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindManyDto', () => {
    it('should properly format findMany dtos', () => {
      const queryDto: Required<RoleFindManyQueryDto> = mockRoleFindManyQueryDtoFactory();
      const { rights, populate, sort, order, take, skip, ...values } = queryDto;
      const where = {
        rights: { some: { id: { in: rights } } },
        ...values,
      };
      const include = formatPopulate(populate);
      const orderBy = { [sort]: order };
      const prismaArgs: Prisma.RoleFindManyArgs = {
        where,
        take,
        skip,
        orderBy,
        include,
      };
      const result = roleRestDtoService.formatFindManyDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpdateDto', () => {
    it('should properly format update dto', () => {
      const paramsDto: RoleUpdateParamsDto = mockRoleUpdateParamsDtoFactory();
      const bodyDto: Required<RoleUpdateBodyDto> = mockRoleUpdateBodyDtoFactory();
      const { rights, ...values } = bodyDto;
      const data = {
        ...values,
        rights: { set: rights.map((id) => ({ id })) },
      };
      const prismaArgs: Prisma.RoleUpdateArgs = { where: paramsDto, data };
      const result = roleRestDtoService.formatUpdateDtos(paramsDto, bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpsertDto', () => {
    it('should properly format upsert dto', () => {
      const paramsDto: RoleUpsertParamsDto = mockRoleUpsertParamsDtoFactory();
      const bodyDto: Required<RoleUpsertBodyDto> = mockRoleUpsertBodyDtoFactory();
      const { rights, ...values } = bodyDto;
      const create = {
        ...values,
        rights: { set: rights.map((id) => ({ id })) },
      };
      const update = { ...create };
      const prismaArgs: Prisma.RoleUpsertArgs = {
        create,
        update,
        where: paramsDto,
      };
      const result = roleRestDtoService.formatUpsertDtos(paramsDto, bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatDeleteDto', () => {
    it('should properly format delete dto', () => {
      const paramsDto: RoleDeleteParamsDto = mockRoleDeleteParamsDtoFactory();
      const prismaArgs: Prisma.RoleDeleteArgs = { where: paramsDto };
      const result = roleRestDtoService.formatDeleteDto(paramsDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
