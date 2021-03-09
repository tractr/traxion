import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import {
  formatPopulate,
  RightCountQueryDto,
  RightCreateBodyDto,
  RightDeleteParamsDto,
  RightFindManyQueryDto,
  RightFindUniqueParamsDto,
  RightFindUniqueQueryDto,
  RightRestDtoService,
  RightUpdateBodyDto,
  RightUpdateParamsDto,
  RightUpsertBodyDto,
  RightUpsertParamsDto,
} from '../../../../src/generated';
import {
  mockRightCountQueryDtoFactory,
  mockRightCreateBodyDtoFactory,
  mockRightDeleteParamsDtoFactory,
  mockRightFindManyQueryDtoFactory,
  mockRightFindUniqueParamsDtoFactory,
  mockRightFindUniqueQueryDtoFactory,
  mockRightUpdateBodyDtoFactory,
  mockRightUpdateParamsDtoFactory,
  mockRightUpsertBodyDtoFactory,
  mockRightUpsertParamsDtoFactory,
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
    it('should properly format create dto', () => {
      const bodyDto: Required<RightCreateBodyDto> = mockRightCreateBodyDtoFactory();
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
    it('should properly format count dto', () => {
      const queryDto: Required<RightCountQueryDto> = mockRightCountQueryDtoFactory();
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
    it('should properly format findUnique dtos', () => {
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
    it('should properly format findMany dtos', () => {
      const queryDto: Required<RightFindManyQueryDto> = mockRightFindManyQueryDtoFactory();
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

  describe('formatUpdateDto', () => {
    it('should properly format update dto', () => {
      const paramsDto: RightUpdateParamsDto = mockRightUpdateParamsDtoFactory();
      const bodyDto: Required<RightUpdateBodyDto> = mockRightUpdateBodyDtoFactory();
      const { ...values } = bodyDto;
      const data = {
        ...values,
      };
      const prismaArgs: Prisma.RightUpdateArgs = { where: paramsDto, data };
      const result = rightRestDtoService.formatUpdateDtos(paramsDto, bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpsertDto', () => {
    it('should properly format upsert dto', () => {
      const paramsDto: RightUpsertParamsDto = mockRightUpsertParamsDtoFactory();
      const bodyDto: Required<RightUpsertBodyDto> = mockRightUpsertBodyDtoFactory();
      const { ...values } = bodyDto;
      const create = {
        ...values,
      };
      const update = { ...create };
      const prismaArgs: Prisma.RightUpsertArgs = {
        create,
        update,
        where: paramsDto,
      };
      const result = rightRestDtoService.formatUpsertDtos(paramsDto, bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatDeleteDto', () => {
    it('should properly format delete dto', () => {
      const paramsDto: RightDeleteParamsDto = mockRightDeleteParamsDtoFactory();
      const prismaArgs: Prisma.RightDeleteArgs = { where: paramsDto };
      const result = rightRestDtoService.formatDeleteDto(paramsDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
