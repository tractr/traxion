import { RoleUpdateBodyDto } from '../../../../src/generated';
import { mockRoleNameFactory, mockRoleRightsIdsFactory } from './role.mock';

export function mockRoleUpdateBodyDtoFactory(
  override: Partial<RoleUpdateBodyDto> = {},
): Required<RoleUpdateBodyDto> {
  return {
    name: mockRoleNameFactory(),
    rights: mockRoleRightsIdsFactory(),
    ...override,
  };
}
