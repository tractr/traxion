import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RoleCreateBodyDto,
  RoleRestDtoService,
} from '../../../../src/generated/role';
import { mockRoleCreateBodyDtoFactory } from '../mocks';

describe('RoleDatabaseService', () => {
  let roleRestDtoService: RoleRestDtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleRestDtoService],
    }).compile();

    roleRestDtoService = module.get<RoleRestDtoService>(RoleRestDtoService);
  });

  it('should be defined', () => {
    expect(roleRestDtoService).toBeDefined();
  });

  describe('formatCreateDto', () => {
    it('should properly format create dto', async () => {
      const bodyDto: RoleCreateBodyDto = mockRoleCreateBodyDtoFactory();
      const { rights, ...values } = bodyDto;
      const data = {
        ...values,
        rights: {
          set: rights.map((id) => {
            id;
          }),
        },
      };
      const prismaArgs: Prisma.RoleCreateArgs = { data };
      const result = roleRestDtoService.formatCreateDto(bodyDto);
      expect(result).toEqual(prismaArgs);
    });
  });
});
