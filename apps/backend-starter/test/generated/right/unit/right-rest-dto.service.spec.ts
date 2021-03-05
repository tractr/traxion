import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RightCreateBodyDto,
  RightCountQueryDto,
  RightFindUniqueParamsDto,
  RightFindUniqueQueryDto,
  formatPopulate,
  RightFindManyQueryDto,
  RightRestDtoService,
} from '../../../../src/generated';
import {
  mockRightCreateBodyDtoFactory,
  mockRightCountQueryDtoFactory,
  mockRightFindUniqueParamsDtoFactory,
  mockRightFindUniqueQueryDtoFactory,
  mockRightFindManyQueryDtoFactory,
} from '../mocks';

describe('RightDatabaseService', () => {
  let rightRestDtoService: RightRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RightRestDtoService],
    }).compile();

    rightRestDtoService = module.get<RightRestDtoService>(RightRestDtoService);
  });

  it('should be defined', () => {
    expect(rightRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', async () => {
      const bodyDto: RightCreateBodyDto = mockRightCreateBodyDtoFactory();
      const { ...values } = bodyDto;
      const data = {
        ...values,
      };
      const prismaArgs: Prisma.RightCreateArgs = { data };
      const result = rightRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatCountDto', () => {
    it('should properly format count dto', async () => {
      const queryDto: RightCountQueryDto = mockRightCountQueryDtoFactory();
      const { ...values } = queryDto;
      const where = {
        ...values,
      };
      const prismaArgs: Prisma.RightCountArgs = { where };
      const result = rightRestDtoService.formatCountDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindUniqueDto', () => {
    it('should properly format findUnique dtos', async () => {
      const paramsDto: RightFindUniqueParamsDto = mockRightFindUniqueParamsDtoFactory();
      const queryDto: RightFindUniqueQueryDto = mockRightFindUniqueQueryDtoFactory();
      const prismaArgs: Prisma.RightFindUniqueArgs = {
        where: { ...paramsDto },
        include: {
          roleAsRights: true,
        },
      };
      const result = rightRestDtoService.formatFindUniqueDtos(
        paramsDto,
        queryDto,
      );
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindManyDto', () => {
    it('should properly format findMany dtos', async () => {
      const queryDto: RightFindManyQueryDto = mockRightFindManyQueryDtoFactory();
      const { populate, sort, order, take, skip, ...values } = queryDto;
      const where = {
        ...values,
      };
      const include = formatPopulate(populate);
      const orderBy = { [sort]: order };
      const prismaArgs: Prisma.RightFindManyArgs = {
        where,
        take,
        skip,
        orderBy,
        include,
      };
      const result = rightRestDtoService.formatFindManyDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
