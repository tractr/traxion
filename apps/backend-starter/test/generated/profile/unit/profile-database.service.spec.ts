/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@tractr/nestjs-database';

import {
  PROFILE_DATABASE_SERVICE,
  ProfileDatabaseService,
} from '../../../../src/generated/profile';
import { mockDatabaseServiceFactory } from '../../mocks';
import { mockProfileFactory } from '../mocks';

describe('ProfileDatabaseService', () => {
  let profileDatabaseService: ProfileDatabaseService;
  let mockedDatabaseService: DatabaseService;

  beforeEach(async () => {
    mockedDatabaseService = mockDatabaseServiceFactory();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PROFILE_DATABASE_SERVICE, useClass: ProfileDatabaseService },
        { provide: DatabaseService, useValue: mockedDatabaseService },
      ],
    }).compile();

    profileDatabaseService = module.get<ProfileDatabaseService>(
      PROFILE_DATABASE_SERVICE,
    );
  });

  it('should be defined', () => {
    expect(profileDatabaseService).toBeDefined();
  });

  describe('findUnique', () => {
    it('should map to DatabaseService.findUnique', async () => {
      const args = ('args' as unknown) as Prisma.ProfileFindUniqueArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile
        .findUnique as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileDatabaseService.findUnique(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.findUnique).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('findFirst', () => {
    it('should map to DatabaseService.findFirst', async () => {
      const args = ('args' as unknown) as Prisma.ProfileFindFirstArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile
        .findFirst as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileDatabaseService.findFirst(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.findFirst).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.findFirst).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('findMany', () => {
    it('should map to DatabaseService.findMany', async () => {
      const args = ('args' as unknown) as Prisma.ProfileFindManyArgs;
      const profile = new Array(3).map(() => mockProfileFactory());
      (mockedDatabaseService.profile.findMany as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileDatabaseService.findMany(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.findMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('create', () => {
    it('should map to DatabaseService.create', async () => {
      const args = ('args' as unknown) as Prisma.ProfileCreateArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile.create as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileDatabaseService.create(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.create).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.create).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to DatabaseService.update', async () => {
      const args = ('args' as unknown) as Prisma.ProfileUpdateArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile.update as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileDatabaseService.update(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.update).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.update).toHaveBeenCalledWith(args);
    });
  });

  describe('updateMany', () => {
    it('should map to DatabaseService.updateMany', async () => {
      const args = ('args' as unknown) as Prisma.ProfileUpdateManyArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile
        .updateMany as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileDatabaseService.updateMany(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.updateMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.updateMany).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('upsert', () => {
    it('should map to DatabaseService.upsert', async () => {
      const args = ('args' as unknown) as Prisma.ProfileUpsertArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile.upsert as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileDatabaseService.upsert(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.upsert).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to DatabaseService.delete', async () => {
      const args = ('args' as unknown) as Prisma.ProfileDeleteArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile.delete as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileDatabaseService.delete(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.delete).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.delete).toHaveBeenCalledWith(args);
    });
  });

  describe('deleteMany', () => {
    it('should map to DatabaseService.deleteMany', async () => {
      const args = ('args' as unknown) as Prisma.ProfileDeleteManyArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile
        .deleteMany as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileDatabaseService.deleteMany(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.deleteMany).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.deleteMany).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('count', () => {
    it('should map to DatabaseService.count', async () => {
      const args = ('args' as unknown) as Prisma.ProfileCountArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile.count as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileDatabaseService.count(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.count).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.count).toHaveBeenCalledWith(args);
    });
  });

  describe('aggregate', () => {
    it('should map to DatabaseService.aggregate', async () => {
      const args = ('args' as unknown) as Prisma.ProfileAggregateArgs;
      const profile = mockProfileFactory();
      (mockedDatabaseService.profile
        .aggregate as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileDatabaseService.aggregate(args);
      expect(result).toEqual(profile);
      expect(mockedDatabaseService.profile.aggregate).toHaveBeenCalledTimes(1);
      expect(mockedDatabaseService.profile.aggregate).toHaveBeenCalledWith(
        args,
      );
    });
  });
});
