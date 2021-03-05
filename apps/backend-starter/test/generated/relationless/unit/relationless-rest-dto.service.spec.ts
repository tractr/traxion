import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RelationlessCreateBodyDto,
  RelationlessCountQueryDto,
  RelationlessFindUniqueParamsDto,
  RelationlessFindManyQueryDto,
  RelationlessUpdateParamsDto,
  RelationlessUpdateBodyDto,
  RelationlessUpsertParamsDto,
  RelationlessUpsertBodyDto,
  RelationlessDeleteParamsDto,
  RelationlessRestDtoService,
} from '../../../../src/generated';
import {
  mockRelationlessCreateBodyDtoFactory,
  mockRelationlessCountQueryDtoFactory,
  mockRelationlessFindUniqueParamsDtoFactory,
  mockRelationlessFindManyQueryDtoFactory,
  mockRelationlessUpdateParamsDtoFactory,
  mockRelationlessUpdateBodyDtoFactory,
  mockRelationlessUpsertParamsDtoFactory,
  mockRelationlessUpsertBodyDtoFactory,
  mockRelationlessDeleteParamsDtoFactory,
} from '../mocks';

describe('RelationlessDatabaseService', () => {
  let relationlessRestDtoService: RelationlessRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationlessRestDtoService],
    }).compile();

    relationlessRestDtoService = module.get<RelationlessRestDtoService>(
      RelationlessRestDtoService,
    );
  });

  it('should be defined', () => {
    expect(relationlessRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', () => {
      const bodyDto: Required<RelationlessCreateBodyDto> = mockRelationlessCreateBodyDtoFactory();
      const { ...values } = bodyDto;
      const data = {
        ...values,
      };
      const prismaArgs: Prisma.RelationlessCreateArgs = { data };
      const result = relationlessRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatCountDto', () => {
    it('should properly format count dto', () => {
      const queryDto: Required<RelationlessCountQueryDto> = mockRelationlessCountQueryDtoFactory();
      const { ...values } = queryDto;
      const where = {
        ...values,
      };
      const prismaArgs: Prisma.RelationlessCountArgs = { where };
      const result = relationlessRestDtoService.formatCountDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindUniqueDto', () => {
    it('should properly format findUnique dtos', () => {
      const paramsDto: RelationlessFindUniqueParamsDto = mockRelationlessFindUniqueParamsDtoFactory();
      const prismaArgs: Prisma.RelationlessFindUniqueArgs = {
        where: { ...paramsDto },
      };
      const result = relationlessRestDtoService.formatFindUniqueDtos(paramsDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindManyDto', () => {
    it('should properly format findMany dtos', () => {
      const queryDto: Required<RelationlessFindManyQueryDto> = mockRelationlessFindManyQueryDtoFactory();
      const { sort, order, take, skip, ...values } = queryDto;
      const where = {
        ...values,
      };
      const orderBy = { [sort]: order };
      const prismaArgs: Prisma.RelationlessFindManyArgs = {
        where,
        take,
        skip,
        orderBy,
      };
      const result = relationlessRestDtoService.formatFindManyDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpdateDto', () => {
    it('should properly format update dto', () => {
      const paramsDto: RelationlessUpdateParamsDto = mockRelationlessUpdateParamsDtoFactory();
      const bodyDto: Required<RelationlessUpdateBodyDto> = mockRelationlessUpdateBodyDtoFactory();
      const { ...values } = bodyDto;
      const data = {
        ...values,
      };
      const prismaArgs: Prisma.RelationlessUpdateArgs = {
        where: paramsDto,
        data,
      };
      const result = relationlessRestDtoService.formatUpdateDtos(
        paramsDto,
        bodyDto,
      );
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpsertDto', () => {
    it('should properly format upsert dto', () => {
      const paramsDto: RelationlessUpsertParamsDto = mockRelationlessUpsertParamsDtoFactory();
      const bodyDto: Required<RelationlessUpsertBodyDto> = mockRelationlessUpsertBodyDtoFactory();
      const { ...values } = bodyDto;
      const create = {
        ...values,
      };
      const update = { ...create };
      const prismaArgs: Prisma.RelationlessUpsertArgs = {
        create,
        update,
        where: paramsDto,
      };
      const result = relationlessRestDtoService.formatUpsertDtos(
        paramsDto,
        bodyDto,
      );
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatDeleteDto', () => {
    it('should properly format delete dto', () => {
      const paramsDto: RelationlessDeleteParamsDto = mockRelationlessDeleteParamsDtoFactory();
      const prismaArgs: Prisma.RelationlessDeleteArgs = { where: paramsDto };
      const result = relationlessRestDtoService.formatDeleteDto(paramsDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
