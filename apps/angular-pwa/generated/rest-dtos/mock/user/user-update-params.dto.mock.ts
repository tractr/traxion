import { UserUpdateParamsDto } from '../../dtos';

import {
  mockUserIdFactory,
} from '@generated/models';

export function mockUserUpdateParamsDtoFactory(
    override: Partial<UserUpdateParamsDto> = {}
): UserUpdateParamsDto {
  return {
    id: mockUserIdFactory(),
  ...override,
  };
}
