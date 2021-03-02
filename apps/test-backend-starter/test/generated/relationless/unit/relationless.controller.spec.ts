import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import {
  RelationlessCreateBodyDto,
  RelationlessController,
  RelationlessService,
  RelationlessRestDtoService,
  RELATIONLESS_REST_DTO_SERVICE,
  RELATIONLESS_SERVICE,
  RelationlessFindUniqueParamsDto,
  RelationlessFindManyQueryDto,
  RelationlessCountQueryDto,
  RelationlessUpdateBodyDto,
  RelationlessUpdateParamsDto,
  RelationlessUpsertBodyDto,
  RelationlessUpsertParamsDto,
  RelationlessDeleteParamsDto,
} from '../../../../src/generated/relationless';
import {
  mockRelationlessFactory,
  mockRelationlessServiceFactory,
  mockRelationlessRestDtoServiceFactory,
} from '../mocks';
describe('RelationlessService', () => {
  let relationlessController: RelationlessController;
  let mockedRelationlessService: RelationlessService;
  let mockedRelationlessRestDtoService: RelationlessRestDtoService;
  beforeEach(async () => {
    mockedRelationlessService = (mockRelationlessServiceFactory() as unknown) as RelationlessService;
    mockedRelationlessRestDtoService = (mockRelationlessRestDtoServiceFactory() as unknown) as RelationlessRestDtoService;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RELATIONLESS_SERVICE, useValue: mockedRelationlessService },
        {
          provide: RELATIONLESS_REST_DTO_SERVICE,
          useValue: mockedRelationlessRestDtoService,
        },
      ],
      controllers: [RelationlessController],
    }).compile();
    relationlessController = module.get<RelationlessController>(
      RelationlessController
    );
  });
  it('should be defined', () => {
    expect(relationlessController).toBeDefined();
  });
  describe('create', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const bodyDto = ('body' as unknown) as RelationlessCreateBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessCreateArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessRestDtoService.formatCreateDto as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.create as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.create(bodyDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatCreateDto
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatCreateDto
      ).toHaveBeenCalledWith(bodyDto);
      expect(mockedRelationlessService.create).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.create).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('findUnique', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as RelationlessFindUniqueParamsDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessFindUniqueArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessRestDtoService.formatFindUniqueDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.findUnique as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.findUnique(paramsDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatFindUniqueDtos
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatFindUniqueDtos
      ).toHaveBeenCalledWith(paramsDto);
      expect(mockedRelationlessService.findUnique).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.findUnique).toHaveBeenCalledWith(
        prismaArgs
      );
    });
  });
  describe('findMany', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const queryDto = ('query' as unknown) as RelationlessFindManyQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessFindManyArgs;
      const relationless = new Array(3).map(() => mockRelationlessFactory());
      (mockedRelationlessRestDtoService.formatFindManyDto as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.findMany as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.findMany(queryDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatFindManyDto
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatFindManyDto
      ).toHaveBeenCalledWith(queryDto);
      expect(mockedRelationlessService.findMany).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.findMany).toHaveBeenCalledWith(
        prismaArgs
      );
    });
  });
  describe('count', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const queryDto = ('query' as unknown) as RelationlessCountQueryDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessCountArgs;
      const relationless = 10;
      (mockedRelationlessRestDtoService.formatCountDto as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.count as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.count(queryDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatCountDto
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatCountDto
      ).toHaveBeenCalledWith(queryDto);
      expect(mockedRelationlessService.count).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.count).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('update', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as RelationlessUpdateParamsDto;
      const bodyDto = ('body' as unknown) as RelationlessUpdateBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessUpdateArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessRestDtoService.formatUpdateDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.update as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.update(paramsDto, bodyDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatUpdateDtos
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatUpdateDtos
      ).toHaveBeenCalledWith(paramsDto, bodyDto);
      expect(mockedRelationlessService.update).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.update).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('upsert', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as RelationlessUpsertParamsDto;
      const bodyDto = ('body' as unknown) as RelationlessUpsertBodyDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessUpsertArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessRestDtoService.formatUpsertDtos as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.upsert as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.upsert(paramsDto, bodyDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatUpsertDtos
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatUpsertDtos
      ).toHaveBeenCalledWith(paramsDto, bodyDto);
      expect(mockedRelationlessService.upsert).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.upsert).toHaveBeenCalledWith(prismaArgs);
    });
  });
  describe('delete', () => {
    it('should map to RelationlessDatabaseService.create', async () => {
      const paramsDto = ('params' as unknown) as RelationlessDeleteParamsDto;
      const prismaArgs = ({} as unknown) as Prisma.RelationlessDeleteArgs;
      const relationless = mockRelationlessFactory();
      (mockedRelationlessRestDtoService.formatDeleteDto as jest.Mock).mockReturnValueOnce(
        prismaArgs
      );
      (mockedRelationlessService.delete as jest.Mock).mockReturnValueOnce(
        relationless
      );
      const result = await relationlessController.delete(paramsDto);
      expect(result).toEqual(relationless);
      expect(
        mockedRelationlessRestDtoService.formatDeleteDto
      ).toHaveBeenCalledTimes(1);
      expect(
        mockedRelationlessRestDtoService.formatDeleteDto
      ).toHaveBeenCalledWith(paramsDto);
      expect(mockedRelationlessService.delete).toHaveBeenCalledTimes(1);
      expect(mockedRelationlessService.delete).toHaveBeenCalledWith(prismaArgs);
    });
  });
});
