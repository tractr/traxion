import { UserFindUniqueParamsDto } from '../../dtos';

import {
  mockUserIdFactory,
} from '@generated/models';

export function mockUserFindUniqueParamsDtoFactory(
    override: Partial<UserFindUniqueParamsDto> = {}
): UserFindUniqueParamsDto {
  return {
    id: mockUserIdFactory(),
  ...override,
  };
}
