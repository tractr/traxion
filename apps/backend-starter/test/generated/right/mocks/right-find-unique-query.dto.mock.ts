import { RightFindUniqueQueryDto } from '../../../../src/generated';

export function mockRightFindUniqueQueryDtoFactory(
  override: Partial<RightFindUniqueQueryDto> = {},
): RightFindUniqueQueryDto {
  return {
    populate: ['roleAsRights'],
    ...override,
  };
}
