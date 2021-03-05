import { RoleUpsertBodyDto } from '../../../../src/generated';
import { mockRoleNameFactory, mockRoleRightsIdsFactory } from './role.mock';

export function mockRoleUpsertBodyDtoFactory(
  override: Partial<RoleUpsertBodyDto> = {},
): Required<RoleUpsertBodyDto> {
  return {
    name: mockRoleNameFactory(),
    rights: mockRoleRightsIdsFactory(),
    ...override,
  };
}
