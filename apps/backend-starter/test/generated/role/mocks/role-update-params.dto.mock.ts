import { RoleUpdateParamsDto } from '../../../../src/generated';
import { mockRoleIdFactory } from './role.mock';

export function mockRoleUpdateParamsDtoFactory(
  override: Partial<RoleUpdateParamsDto> = {},
): RoleUpdateParamsDto {
  return {
    id: mockRoleIdFactory(),
    ...override,
  };
}
