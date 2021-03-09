import { UserUpsertParamsDto } from '../../../../src/generated';
import { mockUserIdFactory } from './user.mock';

export function mockUserUpsertParamsDtoFactory(
  override: Partial<UserUpsertParamsDto> = {},
): UserUpsertParamsDto {
  return {
    id: mockUserIdFactory(),
    ...override,
  };
}
