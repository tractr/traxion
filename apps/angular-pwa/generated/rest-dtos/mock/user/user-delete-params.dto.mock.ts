import { UserDeleteParamsDto } from '../../dtos';

import {
  mockUserIdFactory,
} from '@generated/models';

export function mockUserDeleteParamsDtoFactory(
    override: Partial<UserDeleteParamsDto> = {}
): UserDeleteParamsDto {
  return {
    id: mockUserIdFactory(),
  ...override,
  };
}
