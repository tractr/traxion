import { RelationlessRestDtoService } from '../../../../src/generated';
export function mockRelationlessRestDtoServiceFactory(): RelationlessRestDtoService {
  return ({
    formatCreateDto: jest.fn(),
    formatFindUniqueDtos: jest.fn(),
    formatFindManyDto: jest.fn(),
    formatCountDto: jest.fn(),
    formatUpdateDtos: jest.fn(),
    formatUpsertDtos: jest.fn(),
    formatDeleteDto: jest.fn(),
  } as unknown) as RelationlessRestDtoService;
}
