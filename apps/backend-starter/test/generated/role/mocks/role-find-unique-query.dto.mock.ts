import { RoleFindUniqueQueryDto } from '../../../../src/generated';

export function mockRoleFindUniqueQueryDtoFactory(
  override: Partial<RoleFindUniqueQueryDto> = {},
): RoleFindUniqueQueryDto {
  return {
    populate: ['rights', 'userAsRole'],
    ...override,
  };
}
