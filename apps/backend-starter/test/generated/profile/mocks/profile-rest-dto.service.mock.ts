import { ProfileRestDtoService } from '../../../../src/generated';

export function mockProfileRestDtoServiceFactory(): ProfileRestDtoService {
  return ({
    formatCreateDto: jest.fn(),
    formatFindUniqueDtos: jest.fn(),
    formatFindManyDto: jest.fn(),
    formatCountDto: jest.fn(),
    formatUpdateDtos: jest.fn(),
    formatUpsertDtos: jest.fn(),
    formatDeleteDto: jest.fn(),
  } as unknown) as ProfileRestDtoService;
}
