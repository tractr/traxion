import { RoleCreateBodyDto } from '../../../../src/generated';
import { mockRoleNameFactory, mockRoleRightsIdFactory } from './role.mock';

export function mockRoleCreateBodyDtoFactory(
  override: Partial<RoleCreateBodyDto> = {},
): RoleCreateBodyDto {
  return {
    name: mockRoleNameFactory(),
    rights: new Array(3).map(() => mockRoleRightsIdFactory()),
    ...override,
  };
}
