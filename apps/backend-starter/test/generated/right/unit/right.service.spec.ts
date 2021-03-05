import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RightService,
  RightDatabaseService,
  RIGHT_DATABASE_SERVICE,
  RIGHT_SERVICE,
} from '../../../../src/generated/right';
import { mockPrismaDelegateFactory } from '../../mocks';
import { mockRightFactory } from '../mocks';

describe('RightService', () => {
  let rightService: RightService;
  let mockedRightDatabaseService: RightDatabaseService;

  beforeEach(async () => {
    mockedRightDatabaseService = (mockPrismaDelegateFactory() as unknown) as RightDatabaseService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RIGHT_DATABASE_SERVICE,
          useValue: mockedRightDatabaseService,
        },
        { provide: RIGHT_SERVICE, useClass: RightService },
      ],
    }).compile();
    rightService = module.get<RightService>(RIGHT_SERVICE);
  });

  it('should be defined', () => {
    expect(rightService).toBeDefined();
  });

  describe('create', () => {
    it('should map to RightDatabaseService.create', async () => {
      const args = ('args' as unknown) as Prisma.RightCreateArgs;
      const right = mockRightFactory();
      (mockedRightDatabaseService.create as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.create(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.create).toHaveBeenCalledWith(args);
    });
  });

  describe('findUnique', () => {
    it('should map to RightDatabaseService.findUnique', async () => {
      const args = ('args' as unknown) as Prisma.RightFindUniqueArgs;
      const right = mockRightFactory();
      (mockedRightDatabaseService.findUnique as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.findUnique(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.findUnique).toHaveBeenCalledWith(args);
    });
  });

  describe('findMany', () => {
    it('should map to RightDatabaseService.findMany', async () => {
      const args = ('args' as unknown) as Prisma.RightFindManyArgs;
      const right = new Array(3).map(() => mockRightFactory());
      (mockedRightDatabaseService.findMany as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.findMany(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to RightDatabaseService.count', async () => {
      const args = ('args' as unknown) as Prisma.RightCountArgs;
      const right = 10;
      (mockedRightDatabaseService.count as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.count(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.count).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to RightDatabaseService.update', async () => {
      const args = ('args' as unknown) as Prisma.RightUpdateArgs;
      const right = mockRightFactory();
      (mockedRightDatabaseService.update as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.update(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.update).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.update).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to RightDatabaseService.upsert', async () => {
      const args = ('args' as unknown) as Prisma.RightUpsertArgs;
      const right = mockRightFactory();
      (mockedRightDatabaseService.upsert as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.upsert(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to RightDatabaseService.delete', async () => {
      const args = ('args' as unknown) as Prisma.RightDeleteArgs;
      const right = mockRightFactory();
      (mockedRightDatabaseService.delete as jest.Mock).mockReturnValueOnce(
        right,
      );
      const result = await rightService.delete(args);
      expect(result).toEqual(right);
      expect(mockedRightDatabaseService.delete).toHaveBeenCalledTimes(1);
      expect(mockedRightDatabaseService.delete).toHaveBeenCalledWith(args);
    });
  });
});
