
import { OpenQuestionFindUniqueQueryDto } from '../../dtos';

   
export function mockOpenQuestionFindUniqueQueryDtoFactory(
    override: Partial<OpenQuestionFindUniqueQueryDto> = {}
): OpenQuestionFindUniqueQueryDto {
  return {
    populate: [
      'question',
          'variableAsOpenQuestion',
    ],
  ...override,
  };
}
