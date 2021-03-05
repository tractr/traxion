import { RoleCreateBodyDto } from '../../../../src/generated';
import { mockRoleNameFactory, mockRoleRightsIdsFactory } from './role.mock';

export function mockRoleCreateBodyDtoFactory(
  override: Partial<RoleCreateBodyDto> = {},
): Required<RoleCreateBodyDto> {
  return {
    name: mockRoleNameFactory(),
    rights: mockRoleRightsIdsFactory(),
    ...override,
  };
}
