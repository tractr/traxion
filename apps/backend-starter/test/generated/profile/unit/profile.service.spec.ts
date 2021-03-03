import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  ProfileService,
  ProfileDatabaseService,
  PROFILE_DATABASE_SERVICE,
  PROFILE_SERVICE,
} from '../../../../src/generated/profile';
import { mockPrismaDelegateFactory } from '../../mocks';
import { mockProfileFactory } from '../mocks';

describe('ProfileService', () => {
  let profileService: ProfileService;
  let mockedProfileDatabaseService: ProfileDatabaseService;

  beforeEach(async () => {
    mockedProfileDatabaseService = (mockPrismaDelegateFactory() as unknown) as ProfileDatabaseService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PROFILE_DATABASE_SERVICE,
          useValue: mockedProfileDatabaseService,
        },
        { provide: PROFILE_SERVICE, useClass: ProfileService },
      ],
    }).compile();
    profileService = module.get<ProfileService>(PROFILE_SERVICE);
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
  });

  describe('create', () => {
    it('should map to ProfileDatabaseService.create', async () => {
      const args = ({} as unknown) as Prisma.ProfileCreateArgs;
      const profile = mockProfileFactory();
      (mockedProfileDatabaseService.create as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.create(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.create).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.create).toHaveBeenCalledWith(args);
    });
  });

  describe('findUnique', () => {
    it('should map to ProfileDatabaseService.findUnique', async () => {
      const args = ({} as unknown) as Prisma.ProfileFindUniqueArgs;
      const profile = mockProfileFactory();
      (mockedProfileDatabaseService.findUnique as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.findUnique(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.findUnique).toHaveBeenCalledWith(
        args,
      );
    });
  });

  describe('findMany', () => {
    it('should map to ProfileDatabaseService.findMany', async () => {
      const args = ({} as unknown) as Prisma.ProfileFindManyArgs;
      const profile = new Array(3).map(() => mockProfileFactory());
      (mockedProfileDatabaseService.findMany as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.findMany(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.findMany).toHaveBeenCalledWith(args);
    });
  });

  describe('count', () => {
    it('should map to ProfileDatabaseService.count', async () => {
      const args = ({} as unknown) as Prisma.ProfileCountArgs;
      const profile = 10;
      (mockedProfileDatabaseService.count as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.count(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.count).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.count).toHaveBeenCalledWith(args);
    });
  });

  describe('update', () => {
    it('should map to ProfileDatabaseService.update', async () => {
      const args = ({} as unknown) as Prisma.ProfileUpdateArgs;
      const profile = mockProfileFactory();
      (mockedProfileDatabaseService.update as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.update(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.update).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.update).toHaveBeenCalledWith(args);
    });
  });

  describe('upsert', () => {
    it('should map to ProfileDatabaseService.upsert', async () => {
      const args = ({} as unknown) as Prisma.ProfileUpsertArgs;
      const profile = mockProfileFactory();
      (mockedProfileDatabaseService.upsert as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.upsert(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.upsert).toHaveBeenCalledWith(args);
    });
  });

  describe('delete', () => {
    it('should map to ProfileDatabaseService.delete', async () => {
      const args = ({} as unknown) as Prisma.ProfileDeleteArgs;
      const profile = mockProfileFactory();
      (mockedProfileDatabaseService.delete as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileService.delete(args);
      expect(result).toEqual(profile);
      expect(mockedProfileDatabaseService.delete).toHaveBeenCalledTimes(1);
      expect(mockedProfileDatabaseService.delete).toHaveBeenCalledWith(args);
    });
  });
});
