import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  ProfileCreateBodyDto,
  ProfileCountQueryDto,
  ProfileFindUniqueParamsDto,
  ProfileFindUniqueQueryDto,
  formatPopulate,
  ProfileFindManyQueryDto,
  ProfileRestDtoService,
} from '../../../../src/generated';
import {
  mockProfileCreateBodyDtoFactory,
  mockProfileCountQueryDtoFactory,
  mockProfileFindUniqueParamsDtoFactory,
  mockProfileFindUniqueQueryDtoFactory,
  mockProfileFindManyQueryDtoFactory,
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
    it('should properly format create dto', async () => {
      const bodyDto: ProfileCreateBodyDto = mockProfileCreateBodyDtoFactory();
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
    it('should properly format count dto', async () => {
      const queryDto: ProfileCountQueryDto = mockProfileCountQueryDtoFactory();
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
    it('should properly format findUnique dtos', async () => {
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
    it('should properly format findMany dtos', async () => {
      const queryDto: ProfileFindManyQueryDto = mockProfileFindManyQueryDtoFactory();
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
});
