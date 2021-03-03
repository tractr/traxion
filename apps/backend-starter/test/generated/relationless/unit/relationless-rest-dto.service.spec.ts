import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RelationlessCreateBodyDto,
  RelationlessRestDtoService,
} from '../../../../src/generated/relationless';
import { mockRelationlessCreateBodyDtoFactory } from '../mocks';

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
});
