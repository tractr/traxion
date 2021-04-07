
import { QuestionFindUniqueQueryDto } from '../../dtos';

   
export function mockQuestionFindUniqueQueryDtoFactory(
    override: Partial<QuestionFindUniqueQueryDto> = {}
): QuestionFindUniqueQueryDto {
  return {
    populate: [
      'parentQuestion',
      'tags',
          'answerAsQuestion',
          'messageAsQuestions',
          'openQuestionAsQuestion',
          'questionAsParentQuestion',
    ],
  ...override,
  };
}
