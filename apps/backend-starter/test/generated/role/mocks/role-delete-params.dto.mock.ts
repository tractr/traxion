import { RoleDeleteParamsDto } from '../../../../src/generated';
import { mockRoleIdFactory } from './role.mock';

export function mockRoleDeleteParamsDtoFactory(
  override: Partial<RoleDeleteParamsDto> = {},
): RoleDeleteParamsDto {
  return {
    id: mockRoleIdFactory(),
    ...override,
  };
}
