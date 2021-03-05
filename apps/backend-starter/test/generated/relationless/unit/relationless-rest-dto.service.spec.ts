import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RelationlessCreateBodyDto,
  RelationlessCountQueryDto,
  RelationlessFindUniqueParamsDto,
  RelationlessFindManyQueryDto,
  RelationlessRestDtoService,
} from '../../../../src/generated';
import {
  mockRelationlessCreateBodyDtoFactory,
  mockRelationlessCountQueryDtoFactory,
  mockRelationlessFindUniqueParamsDtoFactory,
  mockRelationlessFindManyQueryDtoFactory,
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
    it('should properly format create dto', async () => {
      const bodyDto: RelationlessCreateBodyDto = mockRelationlessCreateBodyDtoFactory();
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
    it('should properly format count dto', async () => {
      const queryDto: RelationlessCountQueryDto = mockRelationlessCountQueryDtoFactory();
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
    it('should properly format findUnique dtos', async () => {
      const paramsDto: RelationlessFindUniqueParamsDto = mockRelationlessFindUniqueParamsDtoFactory();
      const prismaArgs: Prisma.RelationlessFindUniqueArgs = {
        where: { ...paramsDto },
      };
      const result = relationlessRestDtoService.formatFindUniqueDtos(paramsDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindManyDto', () => {
    it('should properly format findMany dtos', async () => {
      const queryDto: RelationlessFindManyQueryDto = mockRelationlessFindManyQueryDtoFactory();
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
});
