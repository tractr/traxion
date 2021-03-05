import { RoleFindUniqueParamsDto } from '../../../../src/generated';
import { mockRoleIdFactory } from './role.mock';

export function mockRoleFindUniqueParamsDtoFactory(
  override: Partial<RoleFindUniqueParamsDto> = {},
): RoleFindUniqueParamsDto {
  return {
    id: mockRoleIdFactory(),
    ...override,
  };
}
