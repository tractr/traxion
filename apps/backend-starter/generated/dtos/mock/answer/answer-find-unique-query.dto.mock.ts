
import { AnswerFindUniqueQueryDto } from '../../dtos';

   
export function mockAnswerFindUniqueQueryDtoFactory(
    override: Partial<AnswerFindUniqueQueryDto> = {}
): AnswerFindUniqueQueryDto {
  return {
    populate: [
      'user',
      'question',
      'tags',
          'variableAsAnswer',
    ],
  ...override,
  };
}
