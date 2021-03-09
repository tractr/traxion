import { RoleFindManyQueryDto } from '../../../../src/generated';
import {
  mockRoleIdFactory,
  mockRoleNameFactory,
  mockRoleRightsIdsFactory,
} from './role.mock';

export function mockRoleFindManyQueryDtoFactory(
  override: Partial<RoleFindManyQueryDto> = {},
): Required<RoleFindManyQueryDto> {
  return {
    id: mockRoleIdFactory(),
    name: mockRoleNameFactory(),
    rights: mockRoleRightsIdsFactory(),
    populate: ['rights', 'userAsRole'],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
