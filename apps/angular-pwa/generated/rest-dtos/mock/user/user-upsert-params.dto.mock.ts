import { UserUpsertParamsDto } from '../../dtos';

import {
  mockUserIdFactory,
} from '@generated/models';

export function mockUserUpsertParamsDtoFactory(
    override: Partial<UserUpsertParamsDto> = {}
): UserUpsertParamsDto {
  return {
    id: mockUserIdFactory(),
  ...override,
  };
}
