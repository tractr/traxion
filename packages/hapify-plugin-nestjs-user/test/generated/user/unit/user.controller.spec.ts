import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  UserCreateBodyDto,
  UserController,
  UserService,
  UserRestDtoService,
  USER_REST_DTO_SERVICE,
  USER_SERVICE,
  UserFindUniqueParamsDto,
  UserFindManyQueryDto,
  UserCountQueryDto,
  UserUpdateBodyDto,
  UserUpdateParamsDto,
  UserUpsertBodyDto,
  UserUpsertParamsDto,
  UserDeleteParamsDto,
} from '../../../../src/generated/user';
import {
  mockUserFactory,
  mockUserServiceFactory,
  mockUserRestDtoServiceFactory,
} from '../mocks';
describe('UserService', () => {
  let userController: UserController;
  let mockedUserService: UserService;
  let mockedUserRestDtoService: UserRestDtoService;
  beforeEach(async () => {
    mockedUserService = (mockUserServiceFactory() as unknown) as UserService;
    mockedUserRestDtoService = (mockUserRestDtoServiceFactory() as unknown) as UserRestDtoService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: USER_SERVICE, useValue: mockedUserService },
        { provide: USER_REST_DTO_SERVICE, useValue: mockedUserRestDtoService },
      ],
      controllers: [UserController],
    }).compile();
    userController = module.get<UserController>(UserController);
  });
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
  describe('create', () => {
    it('should map to UserDatabaseService.create', async () => {
      const bodyDto = ('body' as unknown) as UserCreateBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.UserCreateArgs;
      const user = mockUserFactory();
      (mockedUserRestDtoService.formatCreateDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.create as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.create(bodyDto);
      expect(result).toEqual(user);
      expect(mockedUserRestDtoService.formatCreateDto).toHaveBeenCalledTimes(1);
      expect(mockedUserRestDtoService.formatCreateDto).toHaveBeenCalledWith(
        bodyDto,
      );
      expect(mockedUserService.create).toHaveBeenCalledTimes(1);
      expect(mockedUserService.create).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('findUnique', () => {
    it('should map to UserDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as UserFindUniqueParamsDto;
      const prismaArgs = ({} as unknown) as Prisma.UserFindUniqueArgs;
      const user = mockUserFactory();
      (mockedUserRestDtoService.formatFindUniqueDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.findUnique as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.findUnique(paramsDto);
      expect(result).toEqual(user);
      expect(
        mockedUserRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedUserRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledWith(paramsDto);
      expect(mockedUserService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedUserService.findUnique).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('findMany', () => {
    it('should map to UserDatabaseService.create', async () => {
      const queryDto = ('query' as unknown) as UserFindManyQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.UserFindManyArgs;
      const user = new Array(3).map(() => mockUserFactory());
      (mockedUserRestDtoService.formatFindManyDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.findMany as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.findMany(queryDto);
      expect(result).toEqual(user);
      expect(mockedUserRestDtoService.formatFindManyDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedUserRestDtoService.formatFindManyDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedUserService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedUserService.findMany).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('count', () => {
    it('should map to UserDatabaseService.create', async () => {
      const queryDto = ('query' as unknown) as UserCountQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.UserCountArgs;
      const user = 10;
      (mockedUserRestDtoService.formatCountDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.count as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.count(queryDto);
      expect(result).toEqual(user);
      expect(mockedUserRestDtoService.formatCountDto).toHaveBeenCalledTimes(1);
      expect(mockedUserRestDtoService.formatCountDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedUserService.count).toHaveBeenCalledTimes(1);
      expect(mockedUserService.count).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('update', () => {
    it('should map to UserDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as UserUpdateParamsDto;
      const bodyDto = ('body' as unknown) as UserUpdateBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.UserUpdateArgs;
      const user = mockUserFactory();
      (mockedUserRestDtoService.formatUpdateDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.update as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.update(paramsDto, bodyDto);
      expect(result).toEqual(user);
      expect(mockedUserRestDtoService.formatUpdateDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedUserRestDtoService.formatUpdateDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedUserService.update).toHaveBeenCalledTimes(1);
      expect(mockedUserService.update).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('upsert', () => {
    it('should map to UserDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as UserUpsertParamsDto;
      const bodyDto = ('body' as unknown) as UserUpsertBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.UserUpsertArgs;
      const user = mockUserFactory();
      (mockedUserRestDtoService.formatUpsertDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.upsert as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.upsert(paramsDto, bodyDto);
      expect(result).toEqual(user);
      expect(mockedUserRestDtoService.formatUpsertDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedUserRestDtoService.formatUpsertDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedUserService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedUserService.upsert).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('delete', () => {
    it('should map to UserDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as UserDeleteParamsDto;
      const prismaArgs = ({} as unknown) as Prisma.UserDeleteArgs;
      const user = mockUserFactory();
      (mockedUserRestDtoService.formatDeleteDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedUserService.delete as jest.Mock).mockReturnValueOnce(user);
      const result = await userController.delete(paramsDto);
      expect(result).toEqual(user);
      expect(mockedUserRestDtoService.formatDeleteDto).toHaveBeenCalledTimes(1);
      expect(mockedUserRestDtoService.formatDeleteDto).toHaveBeenCalledWith(
        paramsDto,
      );
      expect(mockedUserService.delete).toHaveBeenCalledTimes(1);
      expect(mockedUserService.delete).toHaveBeenCalledWith(prismaArgs);
    });
  });
});
