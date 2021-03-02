import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/hapify-plugin-nestjs-database';
import {
  RightDatabaseService,
  RIGHT_DATABASE_SERVICE,
} from '../../../../src/generated/right';
import { mockDatabaseServiceFactory } from '../../mocks';
import { mockRightFactory } from '../mocks';

describe('RightDatabaseService', () => {
  let rightDatabaseService: RightDatabaseService;
  let mockedDatabaseService: DatabaseService;

  beforeEach(async () => {
    mockedDatabaseService = mockDatabaseServiceFactory();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RIGHT_DATABASE_SERVICE, useClass: RightDatabaseService },
        { provide: DatabaseService, useValue: mockedDatabaseService },
      ],
    }).compile();

    rightDatabaseService = module.get<RightDatabaseService>(
      RIGHT_DATABASE_SERVICE
    );
  });

  it('should be defined', () => {
    expect(rightDatabaseService).toBeDefined();
  });

  describe('findUnique', () => {
    it('should map to DatabaseService.findUnique', async () => {
      const args = ({} as unknown) as Prisma.RightFindUniqueArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.findUnique as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.findUnique(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.findUnique).toHaveBeenCalledWith(args);
    });
  });

  describe('findFirst', () => {
    it('should map to DatabaseService.findFirst', async () => {
      const args = ({} as unknown) as Prisma.RightFindFirstArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.findFirst as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.findFirst(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.findFirst).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.findFirst).toHaveBeenCalledWith(args);
    });
  });

  describe('findMany', () => {
    it('should map to DatabaseService.findMany', async () => {
      const args = ({} as unknown) as Prisma.RightFindManyArgs;
      const right = new Array(3).map(() => mockRightFactory());
      (mockedDatabaseService.right.findMany as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.findMany(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.findMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('create', () => {
    it('should map to DatabaseService.create', async () => {
      const args = ({} as unknown) as Prisma.RightCreateArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.create as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.create(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.create).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.create).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to DatabaseService.update', async () => {
      const args = ({} as unknown) as Prisma.RightUpdateArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.update as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.update(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.update).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.update).toHaveBeenCalledWith(args);
    });
  });

  describe('updateMany', () => {
    it('should map to DatabaseService.updateMany', async () => {
      const args = ({} as unknown) as Prisma.RightUpdateManyArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.updateMany as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.updateMany(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.updateMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.updateMany).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to DatabaseService.upsert', async () => {
      const args = ({} as unknown) as Prisma.RightUpsertArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.upsert as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.upsert(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.upsert).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to DatabaseService.delete', async () => {
      const args = ({} as unknown) as Prisma.RightDeleteArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.delete as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.delete(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.delete).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.delete).toHaveBeenCalledWith(args);
    });
  });

  describe('deleteMany', () => {
    it('should map to DatabaseService.deleteMany', async () => {
      const args = ({} as unknown) as Prisma.RightDeleteManyArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.deleteMany as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.deleteMany(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.deleteMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.deleteMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to DatabaseService.count', async () => {
      const args = ({} as unknown) as Prisma.RightCountArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.count as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.count(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.count).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.count).toHaveBeenCalledWith(args);
    });
  });

  describe('aggregate', () => {
    it('should map to DatabaseService.aggregate', async () => {
      const args = ({} as unknown) as Prisma.RightAggregateArgs;
      const right = mockRightFactory();
      (mockedDatabaseService.right.aggregate as jest.Mock).mockReturnValueOnce(
        right
      );
      const result = await rightDatabaseService.aggregate(args);
      expect(result).toEqual(right);
      expect(mockedDatabaseService.right.aggregate).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.right.aggregate).toHaveBeenCalledWith(args);
    });
  });
});
