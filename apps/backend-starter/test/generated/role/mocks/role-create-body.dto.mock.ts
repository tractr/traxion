import { RoleCreateBodyDto } from '../../../../src/generated';
import { mockRoleNameFactory, mockRoleRightsIdsFactory } from './role.mock';

export function mockRoleCreateBodyDtoFactory(
  override: Partial<RoleCreateBodyDto> = {},
): RoleCreateBodyDto {
  return {
    name: mockRoleNameFactory(),
    rights: mockRoleRightsIdsFactory(),
    ...override,
  };
}
