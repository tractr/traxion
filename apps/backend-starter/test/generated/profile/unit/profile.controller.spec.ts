import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  ProfileCreateBodyDto,
  ProfileController,
  ProfileService,
  ProfileRestDtoService,
  PROFILE_REST_DTO_SERVICE,
  PROFILE_SERVICE,
  ProfileFindUniqueParamsDto,
  ProfileFindUniqueQueryDto,
  ProfileFindManyQueryDto,
  ProfileCountQueryDto,
  ProfileUpdateBodyDto,
  ProfileUpdateParamsDto,
  ProfileUpsertBodyDto,
  ProfileUpsertParamsDto,
  ProfileDeleteParamsDto,
} from '../../../../src/generated/profile';
import {
  mockProfileFactory,
  mockProfileServiceFactory,
  mockProfileRestDtoServiceFactory,
} from '../mocks';

describe('ProfileService', () => {
  let profileController: ProfileController;
  let mockedProfileService: ProfileService;
  let mockedProfileRestDtoService: ProfileRestDtoService;

  beforeEach(async () => {
    mockedProfileService = (mockProfileServiceFactory() as unknown) as ProfileService;
    mockedProfileRestDtoService = (mockProfileRestDtoServiceFactory() as unknown) as ProfileRestDtoService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: PROFILE_SERVICE, useValue: mockedProfileService },
        {
          provide: PROFILE_REST_DTO_SERVICE,
          useValue: mockedProfileRestDtoService,
        },
      ],
      controllers: [ProfileController],
    }).compile();
    profileController = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
  });

  describe('create', () => {
    it('should compose ProfileRestDtoService.formatCreateDto and ProfileDatabaseService.create', async () => {
      const bodyDto = ('body' as unknown) as ProfileCreateBodyDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileCreateArgs;
      const profile = mockProfileFactory();
      (mockedProfileRestDtoService.formatCreateDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.create as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileController.create(bodyDto);
      expect(result).toEqual(profile);
      expect(mockedProfileRestDtoService.formatCreateDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedProfileRestDtoService.formatCreateDto).toHaveBeenCalledWith(
        bodyDto,
      );
      expect(mockedProfileService.create).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.create).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('findUnique', () => {
    it('should compose ProfileRestDtoService.formatFindUniqueDtos and ProfileDatabaseService.findUnique', async () => {
      const paramsDto = ('params' as unknown) as ProfileFindUniqueParamsDto;
      const queryDto = ('query' as unknown) as ProfileFindUniqueQueryDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileFindUniqueArgs;
      const profile = mockProfileFactory();
      (mockedProfileRestDtoService.formatFindUniqueDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.findUnique as jest.Mock).mockReturnValueOnce(
        profile,
      );
      const result = await profileController.findUnique(paramsDto, queryDto);
      expect(result).toEqual(profile);
      expect(
        mockedProfileRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedProfileRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledWith(paramsDto, queryDto);
      expect(mockedProfileService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.findUnique).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('findMany', () => {
    it('should compose ProfileRestDtoService.formatFindManyDto and ProfileDatabaseService.findMany', async () => {
      const queryDto = ('query' as unknown) as ProfileFindManyQueryDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileFindManyArgs;
      const profile = new Array(3).map(() => mockProfileFactory());
      (mockedProfileRestDtoService.formatFindManyDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.findMany as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileController.findMany(queryDto);
      expect(result).toEqual(profile);
      expect(
        mockedProfileRestDtoService.formatFindManyDto,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedProfileRestDtoService.formatFindManyDto,
      ).toHaveBeenCalledWith(queryDto);
      expect(mockedProfileService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.findMany).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('count', () => {
    it('should compose ProfileRestDtoService.formatCountDto and ProfileDatabaseService.count', async () => {
      const queryDto = ('query' as unknown) as ProfileCountQueryDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileCountArgs;
      const profile = 10;
      (mockedProfileRestDtoService.formatCountDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.count as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileController.count(queryDto);
      expect(result).toEqual(profile);
      expect(mockedProfileRestDtoService.formatCountDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedProfileRestDtoService.formatCountDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedProfileService.count).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.count).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('update', () => {
    it('should compose ProfileRestDtoService.formatUpdateDtos and ProfileDatabaseService.update', async () => {
      const paramsDto = ('params' as unknown) as ProfileUpdateParamsDto;
      const bodyDto = ('body' as unknown) as ProfileUpdateBodyDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileUpdateArgs;
      const profile = mockProfileFactory();
      (mockedProfileRestDtoService.formatUpdateDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.update as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileController.update(paramsDto, bodyDto);
      expect(result).toEqual(profile);
      expect(
        mockedProfileRestDtoService.formatUpdateDtos,
      ).toHaveBeenCalledTimes(1);
      expect(mockedProfileRestDtoService.formatUpdateDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedProfileService.update).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.update).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('upsert', () => {
    it('should compose ProfileRestDtoService.formatUpsertDtos and ProfileDatabaseService.upsert', async () => {
      const paramsDto = ('params' as unknown) as ProfileUpsertParamsDto;
      const bodyDto = ('body' as unknown) as ProfileUpsertBodyDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileUpsertArgs;
      const profile = mockProfileFactory();
      (mockedProfileRestDtoService.formatUpsertDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.upsert as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileController.upsert(paramsDto, bodyDto);
      expect(result).toEqual(profile);
      expect(
        mockedProfileRestDtoService.formatUpsertDtos,
      ).toHaveBeenCalledTimes(1);
      expect(mockedProfileRestDtoService.formatUpsertDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedProfileService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.upsert).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('delete', () => {
    it('should compose ProfileRestDtoService.formatDeleteDto and ProfileDatabaseService.delete', async () => {
      const paramsDto = ('params' as unknown) as ProfileDeleteParamsDto;
      const prismaArgs = ('args' as unknown) as Prisma.ProfileDeleteArgs;
      const profile = mockProfileFactory();
      (mockedProfileRestDtoService.formatDeleteDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedProfileService.delete as jest.Mock).mockReturnValueOnce(profile);
      const result = await profileController.delete(paramsDto);
      expect(result).toEqual(profile);
      expect(mockedProfileRestDtoService.formatDeleteDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedProfileRestDtoService.formatDeleteDto).toHaveBeenCalledWith(
        paramsDto,
      );
      expect(mockedProfileService.delete).toHaveBeenCalledTimes(1);
      expect(mockedProfileService.delete).toHaveBeenCalledWith(prismaArgs);
    });
  });
});
