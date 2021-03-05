/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import {
  ROLE_REST_DTO_SERVICE,
  ROLE_SERVICE,
  RoleController,
  RoleCountQueryDto,
  RoleCreateBodyDto,
  RoleDeleteParamsDto,
  RoleFindManyQueryDto,
  RoleFindUniqueParamsDto,
  RoleFindUniqueQueryDto,
  RoleRestDtoService,
  RoleService,
  RoleUpdateBodyDto,
  RoleUpdateParamsDto,
  RoleUpsertBodyDto,
  RoleUpsertParamsDto,
} from '../../../../src/generated/role';
import {
  mockRoleFactory,
  mockRoleRestDtoServiceFactory,
  mockRoleServiceFactory,
} from '../mocks';

describe('RoleService', () => {
  let roleController: RoleController;
  let mockedRoleService: RoleService;
  let mockedRoleRestDtoService: RoleRestDtoService;

  beforeEach(async () => {
    mockedRoleService = (mockRoleServiceFactory() as unknown) as RoleService;
    mockedRoleRestDtoService = (mockRoleRestDtoServiceFactory() as unknown) as RoleRestDtoService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ROLE_SERVICE, useValue: mockedRoleService },
        { provide: ROLE_REST_DTO_SERVICE, useValue: mockedRoleRestDtoService },
      ],
      controllers: [RoleController],
    }).compile();
    roleController = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
  });

  describe('create', () => {
    it('should compose RoleRestDtoService.formatCreateDto and RoleDatabaseService.create', async () => {
      const bodyDto = ('body' as unknown) as RoleCreateBodyDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleCreateArgs;
      const role = mockRoleFactory();
      (mockedRoleRestDtoService.formatCreateDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.create as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.create(bodyDto);
      expect(result).toEqual(role);
      expect(mockedRoleRestDtoService.formatCreateDto).toHaveBeenCalledTimes(1);
      expect(mockedRoleRestDtoService.formatCreateDto).toHaveBeenCalledWith(
        bodyDto,
      );
      expect(mockedRoleService.create).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.create).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('findUnique', () => {
    it('should compose RoleRestDtoService.formatFindUniqueDtos and RoleDatabaseService.findUnique', async () => {
      const paramsDto = ('params' as unknown) as RoleFindUniqueParamsDto;
      const queryDto = ('query' as unknown) as RoleFindUniqueQueryDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleFindUniqueArgs;
      const role = mockRoleFactory();
      (mockedRoleRestDtoService.formatFindUniqueDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.findUnique as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.findUnique(paramsDto, queryDto);
      expect(result).toEqual(role);
      expect(
        mockedRoleRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRoleRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledWith(paramsDto, queryDto);
      expect(mockedRoleService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.findUnique).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('findMany', () => {
    it('should compose RoleRestDtoService.formatFindManyDto and RoleDatabaseService.findMany', async () => {
      const queryDto = ('query' as unknown) as RoleFindManyQueryDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleFindManyArgs;
      const role = new Array(3).map(() => mockRoleFactory());
      (mockedRoleRestDtoService.formatFindManyDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.findMany as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.findMany(queryDto);
      expect(result).toEqual(role);
      expect(mockedRoleRestDtoService.formatFindManyDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRoleRestDtoService.formatFindManyDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedRoleService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.findMany).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('count', () => {
    it('should compose RoleRestDtoService.formatCountDto and RoleDatabaseService.count', async () => {
      const queryDto = ('query' as unknown) as RoleCountQueryDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleCountArgs;
      const role = 10;
      (mockedRoleRestDtoService.formatCountDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.count as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.count(queryDto);
      expect(result).toEqual(role);
      expect(mockedRoleRestDtoService.formatCountDto).toHaveBeenCalledTimes(1);
      expect(mockedRoleRestDtoService.formatCountDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedRoleService.count).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.count).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('update', () => {
    it('should compose RoleRestDtoService.formatUpdateDtos and RoleDatabaseService.update', async () => {
      const paramsDto = ('params' as unknown) as RoleUpdateParamsDto;
      const bodyDto = ('body' as unknown) as RoleUpdateBodyDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleUpdateArgs;
      const role = mockRoleFactory();
      (mockedRoleRestDtoService.formatUpdateDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.update as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.update(paramsDto, bodyDto);
      expect(result).toEqual(role);
      expect(mockedRoleRestDtoService.formatUpdateDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRoleRestDtoService.formatUpdateDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedRoleService.update).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.update).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('upsert', () => {
    it('should compose RoleRestDtoService.formatUpsertDtos and RoleDatabaseService.upsert', async () => {
      const paramsDto = ('params' as unknown) as RoleUpsertParamsDto;
      const bodyDto = ('body' as unknown) as RoleUpsertBodyDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleUpsertArgs;
      const role = mockRoleFactory();
      (mockedRoleRestDtoService.formatUpsertDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.upsert as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.upsert(paramsDto, bodyDto);
      expect(result).toEqual(role);
      expect(mockedRoleRestDtoService.formatUpsertDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRoleRestDtoService.formatUpsertDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedRoleService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.upsert).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('delete', () => {
    it('should compose RoleRestDtoService.formatDeleteDto and RoleDatabaseService.delete', async () => {
      const paramsDto = ('params' as unknown) as RoleDeleteParamsDto;
      const prismaArgs = ('args' as unknown) as Prisma.RoleDeleteArgs;
      const role = mockRoleFactory();
      (mockedRoleRestDtoService.formatDeleteDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRoleService.delete as jest.Mock).mockReturnValueOnce(role);
      const result = await roleController.delete(paramsDto);
      expect(result).toEqual(role);
      expect(mockedRoleRestDtoService.formatDeleteDto).toHaveBeenCalledTimes(1);
      expect(mockedRoleRestDtoService.formatDeleteDto).toHaveBeenCalledWith(
        paramsDto,
      );
      expect(mockedRoleService.delete).toHaveBeenCalledTimes(1);
      expect(mockedRoleService.delete).toHaveBeenCalledWith(prismaArgs);
    });
  });
});
