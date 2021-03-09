import { ProfileFindUniqueQueryDto } from '../../../../src/generated';

export function mockProfileFindUniqueQueryDtoFactory(
  override: Partial<ProfileFindUniqueQueryDto> = {},
): ProfileFindUniqueQueryDto {
  return {
    populate: ['owner'],
    ...override,
  };
}
