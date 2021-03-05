/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import {
  RELATIONLESS_DATABASE_SERVICE,
  RELATIONLESS_SERVICE,
  RelationlessDatabaseService,
  RelationlessService,
} from '../../../../src/generated/relationless';
import { mockPrismaDelegateFactory } from '../../mocks';
import { mockRelationlessFactory } from '../mocks';

describe('RelationlessService', () => {
  let relationlessService: RelationlessService;
  let mockedRelationlessDatabaseService: RelationlessDatabaseService;

  beforeEach(async () => {
    mockedRelationlessDatabaseService = (mockPrismaDelegateFactory() as unknown) as RelationlessDatabaseService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RELATIONLESS_DATABASE_SERVICE,
          useValue: mockedRelationlessDatabaseService,
        },
        { provide: RELATIONLESS_SERVICE, useClass: RelationlessService },
      ],
    }).compile();
    relationlessService = module.get<RelationlessService>(RELATIONLESS_SERVICE);
  });

  it('should be defined', () => {
    expect(relationlessService).toBeDefined();
  });

  describe('create', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessCreateArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessDatabaseService.create as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.create(args);
      expect(result).toEqual(relationless);
      expect(mockedRelationlessDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessDatabaseService.create).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('findUnique', () => {
    it('should map to RelationlessDatabaseService.findUnique', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessFindUniqueArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessDatabaseService.findUnique as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.findUnique(args);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessDatabaseService.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessDatabaseService.findUnique).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('findMany', () => {
    it('should map to RelationlessDatabaseService.findMany', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessFindManyArgs;
      const relationless = new Array(3).map(() => mockRelationlessFactory());
      (mockedRelationlessDatabaseService.findMany as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.findMany(args);
      expect(result).toEqual(relationless);
      expect(mockedRelationlessDatabaseService.findMany).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRelationlessDatabaseService.findMany).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('count', () => {
    it('should map to RelationlessDatabaseService.count', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessCountArgs;
      const relationless = 10;
      (mockedRelationlessDatabaseService.count as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.count(args);
      expect(result).toEqual(relationless);
      expect(mockedRelationlessDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessDatabaseService.count).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('update', () => {
    it('should map to RelationlessDatabaseService.update', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessUpdateArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessDatabaseService.update as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.update(args);
      expect(result).toEqual(relationless);
      expect(mockedRelationlessDatabaseService.update).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessDatabaseService.update).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('upsert', () => {
    it('should map to RelationlessDatabaseService.upsert', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessUpsertArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessDatabaseService.upsert as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.upsert(args);
      expect(result).toEqual(relationless);
      expect(mockedRelationlessDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessDatabaseService.upsert).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('delete', () => {
    it('should map to RelationlessDatabaseService.delete', async () => {
      const args = ('args' as unknown) as Prisma.RelationlessDeleteArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessDatabaseService.delete as jest.Mock).mockReturnValueOnce(
        relationless,
      );
      const result = await relationlessService.delete(args);
      expect(result).toEqual(relationless);
      expect(mockedRelationlessDatabaseService.delete).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessDatabaseService.delete).toHaveBeenCalledWith(
        args,
      );
    });
  });
});
