import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  UserCreateBodyDto,
  UserCountQueryDto,
  UserFindUniqueParamsDto,
  UserFindUniqueQueryDto,
  formatPopulate,
  UserFindManyQueryDto,
  UserRestDtoService,
} from '../../../../src/generated';
import {
  mockUserCreateBodyDtoFactory,
  mockUserCountQueryDtoFactory,
  mockUserFindUniqueParamsDtoFactory,
  mockUserFindUniqueQueryDtoFactory,
  mockUserFindManyQueryDtoFactory,
} from '../mocks';

describe('UserDatabaseService', () => {
  let userRestDtoService: UserRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRestDtoService],
    }).compile();

    userRestDtoService = module.get<UserRestDtoService>(UserRestDtoService);
  });

  it('should be defined', () => {
    expect(userRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', async () => {
      const bodyDto: UserCreateBodyDto = mockUserCreateBodyDtoFactory();
      const { role, ...values } = bodyDto;
      const data = {
        ...values,
        role: { connect: { id: role } },
      };
      const prismaArgs: Prisma.UserCreateArgs = { data };
      const result = userRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatCountDto', () => {
    it('should properly format count dto', async () => {
      const queryDto: UserCountQueryDto = mockUserCountQueryDtoFactory();
      const { list, role, ...values } = queryDto;
      const where = {
        ...values,
        list: { hasSome: list },
        role: { id: role },
      };
      const prismaArgs: Prisma.UserCountArgs = { where };
      const result = userRestDtoService.formatCountDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindUniqueDto', () => {
    it('should properly format findUnique dtos', async () => {
      const paramsDto: UserFindUniqueParamsDto = mockUserFindUniqueParamsDtoFactory();
      const queryDto: UserFindUniqueQueryDto = mockUserFindUniqueQueryDtoFactory();
      const prismaArgs: Prisma.UserFindUniqueArgs = {
        where: { ...paramsDto },
        include: {
          role: true,
          profileAsOwner: true,
        },
      };
      const result = userRestDtoService.formatFindUniqueDtos(
        paramsDto,
        queryDto,
      );
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindManyDto', () => {
    it('should properly format findMany dtos', async () => {
      const queryDto: UserFindManyQueryDto = mockUserFindManyQueryDtoFactory();
      const {
        list,
        role,
        populate,
        sort,
        order,
        take,
        skip,
        ...values
      } = queryDto;
      const where = {
        list: { hasSome: list },
        role: { id: role },
        ...values,
      };
      const include = formatPopulate(populate);
      const orderBy = { [sort]: order };
      const prismaArgs: Prisma.UserFindManyArgs = {
        where,
        take,
        skip,
        orderBy,
        include,
      };
      const result = userRestDtoService.formatFindManyDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
