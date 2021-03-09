import { UserFindUniqueQueryDto } from '../../../../src/generated';

export function mockUserFindUniqueQueryDtoFactory(
  override: Partial<UserFindUniqueQueryDto> = {},
): UserFindUniqueQueryDto {
  return {
    populate: ['role', 'profileAsOwner'],
    ...override,
  };
}
