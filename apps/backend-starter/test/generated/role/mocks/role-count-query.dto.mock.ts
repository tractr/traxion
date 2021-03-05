import { RoleCountQueryDto } from '../../../../src/generated';
import {
  mockRoleIdFactory,
  mockRoleNameFactory,
  mockRoleRightsIdsFactory,
} from './role.mock';

export function mockRoleCountQueryDtoFactory(
  override: Partial<RoleCountQueryDto> = {},
): RoleCountQueryDto {
  return {
    id: mockRoleIdFactory(),
    name: mockRoleNameFactory(),
    rights: mockRoleRightsIdsFactory(),
    ...override,
  };
}
