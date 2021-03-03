import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  ProfileCreateBodyDto,
  ProfileRestDtoService,
} from '../../../../src/generated/profile';
import { mockProfileCreateBodyDtoFactory } from '../mocks';

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
});
