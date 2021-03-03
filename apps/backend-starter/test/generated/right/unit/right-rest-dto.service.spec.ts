import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RightCreateBodyDto,
  RightRestDtoService,
} from '../../../../src/generated/right';
import { mockRightCreateBodyDtoFactory } from '../mocks';

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
});
