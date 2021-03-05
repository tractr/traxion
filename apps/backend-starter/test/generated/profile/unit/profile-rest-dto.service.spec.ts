import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import {
  formatPopulate,
  ProfileCountQueryDto,
  ProfileCreateBodyDto,
  ProfileDeleteParamsDto,
  ProfileFindManyQueryDto,
  ProfileFindUniqueParamsDto,
  ProfileFindUniqueQueryDto,
  ProfileRestDtoService,
  ProfileUpdateBodyDto,
  ProfileUpdateParamsDto,
  ProfileUpsertBodyDto,
  ProfileUpsertParamsDto,
} from '../../../../src/generated';
import {
  mockProfileCountQueryDtoFactory,
  mockProfileCreateBodyDtoFactory,
  mockProfileDeleteParamsDtoFactory,
  mockProfileFindManyQueryDtoFactory,
  mockProfileFindUniqueParamsDtoFactory,
  mockProfileFindUniqueQueryDtoFactory,
  mockProfileUpdateBodyDtoFactory,
  mockProfileUpdateParamsDtoFactory,
  mockProfileUpsertBodyDtoFactory,
  mockProfileUpsertParamsDtoFactory,
} from '../mocks';

describe('ProfileDatabaseService', () => {
  let profileRestDtoService: ProfileRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileRestDtoService],
    }).compile();

    profileRestDtoService = module.get<ProfileRestDtoService>(
      ProfileRestDtoService,
    );
  });

  it('should be defined', () => {
    expect(profileRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', () => {
      const bodyDto: Required<ProfileCreateBodyDto> = mockProfileCreateBodyDtoFactory();
      const { owner, ...values } = bodyDto;
      const data = {
        ...values,
        owner: { connect: { id: owner } },
      };
      const prismaArgs: Prisma.ProfileCreateArgs = { data };
      const result = profileRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatCountDto', () => {
    it('should properly format count dto', () => {
      const queryDto: Required<ProfileCountQueryDto> = mockProfileCountQueryDtoFactory();
      const { owner, ...values } = queryDto;
      const where = {
        ...values,
        owner: { id: owner },
      };
      const prismaArgs: Prisma.ProfileCountArgs = { where };
      const result = profileRestDtoService.formatCountDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindUniqueDto', () => {
    it('should properly format findUnique dtos', () => {
      const paramsDto: ProfileFindUniqueParamsDto = mockProfileFindUniqueParamsDtoFactory();
      const queryDto: ProfileFindUniqueQueryDto = mockProfileFindUniqueQueryDtoFactory();
      const prismaArgs: Prisma.ProfileFindUniqueArgs = {
        where: { ...paramsDto },
        include: {
          owner: true,
        },
      };
      const result = profileRestDtoService.formatFindUniqueDtos(
        paramsDto,
        queryDto,
      );
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatFindManyDto', () => {
    it('should properly format findMany dtos', () => {
      const queryDto: Required<ProfileFindManyQueryDto> = mockProfileFindManyQueryDtoFactory();
      const { owner, populate, sort, order, take, skip, ...values } = queryDto;
      const where = {
        owner: { id: owner },
        ...values,
      };
      const include = formatPopulate(populate);
      const orderBy = { [sort]: order };
      const prismaArgs: Prisma.ProfileFindManyArgs = {
        where,
        take,
        skip,
        orderBy,
        include,
      };
      const result = profileRestDtoService.formatFindManyDto(queryDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpdateDto', () => {
    it('should properly format update dto', () => {
      const paramsDto: ProfileUpdateParamsDto = mockProfileUpdateParamsDtoFactory();
      const bodyDto: Required<ProfileUpdateBodyDto> = mockProfileUpdateBodyDtoFactory();
      const { owner, ...values } = bodyDto;
      const data = {
        ...values,
        owner: { connect: { id: owner } },
      };
      const prismaArgs: Prisma.ProfileUpdateArgs = { where: paramsDto, data };
      const result = profileRestDtoService.formatUpdateDtos(paramsDto, bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatUpsertDto', () => {
    it('should properly format upsert dto', () => {
      const paramsDto: ProfileUpsertParamsDto = mockProfileUpsertParamsDtoFactory();
      const bodyDto: Required<ProfileUpsertBodyDto> = mockProfileUpsertBodyDtoFactory();
      const { owner, ...values } = bodyDto;
      const create = {
        ...values,
        owner: { connect: { id: owner } },
      };
      const update = { ...create };
      const prismaArgs: Prisma.ProfileUpsertArgs = {
        create,
        update,
        where: paramsDto,
      };
      const result = profileRestDtoService.formatUpsertDtos(paramsDto, bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });

  describe('formatDeleteDto', () => {
    it('should properly format delete dto', () => {
      const paramsDto: ProfileDeleteParamsDto = mockProfileDeleteParamsDtoFactory();
      const prismaArgs: Prisma.ProfileDeleteArgs = { where: paramsDto };
      const result = profileRestDtoService.formatDeleteDto(paramsDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
