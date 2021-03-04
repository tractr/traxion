import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/nestjs-database';

import {
  RELATIONLESS_DATABASE_SERVICE,
  RelationlessDatabaseService,
} from '../../../../src/generated/relationless';
import { mockDatabaseServiceFactory } from '../../mocks';
import { mockRelationlessFactory } from '../mocks';

describe('RelationlessDatabaseService', () => {
  let relationlessDatabaseService: RelationlessDatabaseService;
  let mockedDatabaseService: DatabaseService;

  beforeEach(async () => {
    mockedDatabaseService = mockDatabaseServiceFactory();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RELATIONLESS_DATABASE_SERVICE,
          useClass: RelationlessDatabaseService,
        },
        { provide: DatabaseService, useValue: mockedDatabaseService },
      ],
    }).compile();

    relationlessDatabaseService = module.get<RelationlessDatabaseService>(
      RELATIONLESS_DATABASE_SERVICE,
    );
  });

  it('should be defined', () => {
    expect(relationlessDatabaseService).toBeDefined();
  });

  describe('findUnique', () => {
    it('should map to DatabaseService.findUnique', async () => {
      const args = ({} as unknown) as Prisma.RelationlessFindUniqueArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .findUnique as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.findUnique(args);
      expect(result).toEqual(relationless);
      expect(
        mockedDatabaseService.relationless.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedDatabaseService.relationless.findUnique,
      ).toHaveBeenCalledWith(args);
    });
  });

  describe('findFirst', () => {
    it('should map to DatabaseService.findFirst', async () => {
      const args = ({} as unknown) as Prisma.RelationlessFindFirstArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .findFirst as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.findFirst(args);
      expect(result).toEqual(relationless);
      expect(
        mockedDatabaseService.relationless.findFirst,
      ).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.relationless.findFirst).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('findMany', () => {
    it('should map to DatabaseService.findMany', async () => {
      const args = ({} as unknown) as Prisma.RelationlessFindManyArgs;
      const relationless = new Array(3).map(() => mockRelationlessFactory());
      (mockedDatabaseService.relationless
        .findMany as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.findMany(args);
      expect(result).toEqual(relationless);
      expect(mockedDatabaseService.relationless.findMany).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedDatabaseService.relationless.findMany).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('create', () => {
    it('should map to DatabaseService.create', async () => {
      const args = ({} as unknown) as Prisma.RelationlessCreateArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .create as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.create(args);
      expect(result).toEqual(relationless);
      expect(mockedDatabaseService.relationless.create).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedDatabaseService.relationless.create).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('update', () => {
    it('should map to DatabaseService.update', async () => {
      const args = ({} as unknown) as Prisma.RelationlessUpdateArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .update as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.update(args);
      expect(result).toEqual(relationless);
      expect(mockedDatabaseService.relationless.update).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedDatabaseService.relationless.update).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('updateMany', () => {
    it('should map to DatabaseService.updateMany', async () => {
      const args = ({} as unknown) as Prisma.RelationlessUpdateManyArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .updateMany as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.updateMany(args);
      expect(result).toEqual(relationless);
      expect(
        mockedDatabaseService.relationless.updateMany,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedDatabaseService.relationless.updateMany,
      ).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to DatabaseService.upsert', async () => {
      const args = ({} as unknown) as Prisma.RelationlessUpsertArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .upsert as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.upsert(args);
      expect(result).toEqual(relationless);
      expect(mockedDatabaseService.relationless.upsert).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedDatabaseService.relationless.upsert).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('delete', () => {
    it('should map to DatabaseService.delete', async () => {
      const args = ({} as unknown) as Prisma.RelationlessDeleteArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .delete as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.delete(args);
      expect(result).toEqual(relationless);
      expect(mockedDatabaseService.relationless.delete).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedDatabaseService.relationless.delete).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('deleteMany', () => {
    it('should map to DatabaseService.deleteMany', async () => {
      const args = ({} as unknown) as Prisma.RelationlessDeleteManyArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .deleteMany as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.deleteMany(args);
      expect(result).toEqual(relationless);
      expect(
        mockedDatabaseService.relationless.deleteMany,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedDatabaseService.relationless.deleteMany,
      ).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to DatabaseService.count', async () => {
      const args = ({} as unknown) as Prisma.RelationlessCountArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .count as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.count(args);
      expect(result).toEqual(relationless);
      expect(mockedDatabaseService.relationless.count).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.relationless.count).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('aggregate', () => {
    it('should map to DatabaseService.aggregate', async () => {
      const args = ({} as unknown) as Prisma.RelationlessAggregateArgs;
      const relationless = mockRelationlessFactory();
      (mockedDatabaseService.relationless
        .aggregate as jest.Mock).mockReturnValueOnce(relationless);
      const result = await relationlessDatabaseService.aggregate(args);
      expect(result).toEqual(relationless);
      expect(
        mockedDatabaseService.relationless.aggregate,
      ).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.relationless.aggregate).toHaveBeenCalledWith(
        args,
      );
    });
  });
});
