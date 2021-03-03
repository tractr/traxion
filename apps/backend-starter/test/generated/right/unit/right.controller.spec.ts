import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RightCreateBodyDto,
  RightController,
  RightService,
  RightRestDtoService,
  RIGHT_REST_DTO_SERVICE,
  RIGHT_SERVICE,
  RightFindUniqueParamsDto,
  RightFindUniqueQueryDto,
  RightFindManyQueryDto,
  RightCountQueryDto,
  RightUpdateBodyDto,
  RightUpdateParamsDto,
  RightUpsertBodyDto,
  RightUpsertParamsDto,
  RightDeleteParamsDto,
} from '../../../../src/generated/right';
import {
  mockRightFactory,
  mockRightServiceFactory,
  mockRightRestDtoServiceFactory,
} from '../mocks';

describe('RightService', () => {
  let rightController: RightController;
  let mockedRightService: RightService;
  let mockedRightRestDtoService: RightRestDtoService;

  beforeEach(async () => {
    mockedRightService = (mockRightServiceFactory() as unknown) as RightService;
    mockedRightRestDtoService = (mockRightRestDtoServiceFactory() as unknown) as RightRestDtoService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RIGHT_SERVICE, useValue: mockedRightService },
        {
          provide: RIGHT_REST_DTO_SERVICE,
          useValue: mockedRightRestDtoService,
        },
      ],
      controllers: [RightController],
    }).compile();
    rightController = module.get<RightController>(RightController);
  });

  it('should be defined', () => {
    expect(rightController).toBeDefined();
  });

  describe('create', () => {
    it('should compose RightRestDtoService.formatCreateDto and RightDatabaseService.create', async () => {
      const bodyDto = ('body' as unknown) as RightCreateBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.RightCreateArgs;
      const right = mockRightFactory();
      (mockedRightRestDtoService.formatCreateDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.create as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.create(bodyDto);
      expect(result).toEqual(right);
      expect(mockedRightRestDtoService.formatCreateDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRightRestDtoService.formatCreateDto).toHaveBeenCalledWith(
        bodyDto,
      );
      expect(mockedRightService.create).toHaveBeenCalledTimes(1);
      expect(mockedRightService.create).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('findUnique', () => {
    it('should compose RightRestDtoService.formatFindUniqueDtos and RightDatabaseService.findUnique', async () => {
      const paramsDto = ('params' as unknown) as RightFindUniqueParamsDto;
      const queryDto = ('query' as unknown) as RightFindUniqueQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.RightFindUniqueArgs;
      const right = mockRightFactory();
      (mockedRightRestDtoService.formatFindUniqueDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.findUnique as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.findUnique(paramsDto, queryDto);
      expect(result).toEqual(right);
      expect(
        mockedRightRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRightRestDtoService.formatFindUniqueDtos,
      ).toHaveBeenCalledWith(paramsDto, queryDto);
      expect(mockedRightService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedRightService.findUnique).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('findMany', () => {
    it('should compose RightRestDtoService.formatFindManyDto and RightDatabaseService.findMany', async () => {
      const queryDto = ('query' as unknown) as RightFindManyQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.RightFindManyArgs;
      const right = new Array(3).map(() => mockRightFactory());
      (mockedRightRestDtoService.formatFindManyDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.findMany as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.findMany(queryDto);
      expect(result).toEqual(right);
      expect(mockedRightRestDtoService.formatFindManyDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRightRestDtoService.formatFindManyDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedRightService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedRightService.findMany).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('count', () => {
    it('should compose RightRestDtoService.formatCountDto and RightDatabaseService.count', async () => {
      const queryDto = ('query' as unknown) as RightCountQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.RightCountArgs;
      const right = 10;
      (mockedRightRestDtoService.formatCountDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.count as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.count(queryDto);
      expect(result).toEqual(right);
      expect(mockedRightRestDtoService.formatCountDto).toHaveBeenCalledTimes(1);
      expect(mockedRightRestDtoService.formatCountDto).toHaveBeenCalledWith(
        queryDto,
      );
      expect(mockedRightService.count).toHaveBeenCalledTimes(1);
      expect(mockedRightService.count).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('update', () => {
    it('should compose RightRestDtoService.formatUpdateDtos and RightDatabaseService.update', async () => {
      const paramsDto = ('params' as unknown) as RightUpdateParamsDto;
      const bodyDto = ('body' as unknown) as RightUpdateBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.RightUpdateArgs;
      const right = mockRightFactory();
      (mockedRightRestDtoService.formatUpdateDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.update as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.update(paramsDto, bodyDto);
      expect(result).toEqual(right);
      expect(mockedRightRestDtoService.formatUpdateDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRightRestDtoService.formatUpdateDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedRightService.update).toHaveBeenCalledTimes(1);
      expect(mockedRightService.update).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('upsert', () => {
    it('should compose RightRestDtoService.formatUpsertDtos and RightDatabaseService.upsert', async () => {
      const paramsDto = ('params' as unknown) as RightUpsertParamsDto;
      const bodyDto = ('body' as unknown) as RightUpsertBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.RightUpsertArgs;
      const right = mockRightFactory();
      (mockedRightRestDtoService.formatUpsertDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.upsert as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.upsert(paramsDto, bodyDto);
      expect(result).toEqual(right);
      expect(mockedRightRestDtoService.formatUpsertDtos).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRightRestDtoService.formatUpsertDtos).toHaveBeenCalledWith(
        paramsDto,
        bodyDto,
      );
      expect(mockedRightService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedRightService.upsert).toHaveBeenCalledWith(prismaArgs);
    });
  });

  describe('delete', () => {
    it('should compose RightRestDtoService.formatDeleteDto and RightDatabaseService.delete', async () => {
      const paramsDto = ('params' as unknown) as RightDeleteParamsDto;
      const prismaArgs = ({} as unknown) as Prisma.RightDeleteArgs;
      const right = mockRightFactory();
      (mockedRightRestDtoService.formatDeleteDto as jest.Mock).mockReturnValueOnce(
        prismaArgs,
      );
      (mockedRightService.delete as jest.Mock).mockReturnValueOnce(right);
      const result = await rightController.delete(paramsDto);
      expect(result).toEqual(right);
      expect(mockedRightRestDtoService.formatDeleteDto).toHaveBeenCalledTimes(
        1,
      );
      expect(mockedRightRestDtoService.formatDeleteDto).toHaveBeenCalledWith(
        paramsDto,
      );
      expect(mockedRightService.delete).toHaveBeenCalledTimes(1);
      expect(mockedRightService.delete).toHaveBeenCalledWith(prismaArgs);
    });
  });
});
