import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RoleCreateBodyDto,
  RoleCountQueryDto,
  RoleFindUniqueParamsDto,
  RoleFindUniqueQueryDto,
  formatPopulate,
  RoleFindManyQueryDto,
  RoleRestDtoService,
} from '../../../../src/generated';
import {
  mockRoleCreateBodyDtoFactory,
  mockRoleCountQueryDtoFactory,
  mockRoleFindUniqueParamsDtoFactory,
  mockRoleFindUniqueQueryDtoFactory,
  mockRoleFindManyQueryDtoFactory,
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
    it('should properly format create dto', async () => {
      const bodyDto: RoleCreateBodyDto = mockRoleCreateBodyDtoFactory();
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
    it('should properly format count dto', async () => {
      const queryDto: RoleCountQueryDto = mockRoleCountQueryDtoFactory();
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
    it('should properly format findUnique dtos', async () => {
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
    it('should properly format findMany dtos', async () => {
      const queryDto: RoleFindManyQueryDto = mockRoleFindManyQueryDtoFactory();
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
});
