import { RoleUpsertParamsDto } from '../../../../src/generated';
import { mockRoleIdFactory } from './role.mock';

export function mockRoleUpsertParamsDtoFactory(
  override: Partial<RoleUpsertParamsDto> = {},
): RoleUpsertParamsDto {
  return {
    id: mockRoleIdFactory(),
    ...override,
  };
}
