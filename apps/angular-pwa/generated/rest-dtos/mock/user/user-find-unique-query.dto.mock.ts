
import { UserFindUniqueQueryDto } from '../../dtos';

   
export function mockUserFindUniqueQueryDtoFactory(
    override: Partial<UserFindUniqueQueryDto> = {}
): UserFindUniqueQueryDto {
  return {
    populate: [
          'answerAsUser',
    ],
  ...override,
  };
}
