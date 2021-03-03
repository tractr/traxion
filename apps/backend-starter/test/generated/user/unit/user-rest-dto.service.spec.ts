import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  UserCreateBodyDto,
  UserRestDtoService,
} from '../../../../src/generated/user';
import { mockUserCreateBodyDtoFactory } from '../mocks';

describe('UserDatabaseService', () => {
  let userRestDtoService: UserRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRestDtoService],
    }).compile();

    userRestDtoService = module.get<UserRestDtoService>(UserRestDtoService);
  });

  it('should be defined', () => {
    expect(userRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', async () => {
      const bodyDto: UserCreateBodyDto = mockUserCreateBodyDtoFactory();
      const { role, ...values } = bodyDto;
      const data = {
        ...values,
        role: { connect: { id: role } },
      };
      const prismaArgs: Prisma.UserCreateArgs = { data };
      const result = userRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
