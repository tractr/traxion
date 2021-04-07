import { QuestionFindManyQueryDto } from '../../dtos';

import {
  mockQuestionIdFactory,
  mockQuestionTitleFactory,
  mockQuestionTextFactory,
} from '@generated/models';

export function mockQuestionFindManyQueryDtoFactory(
  override: Partial<QuestionFindManyQueryDto> = {}
): Required< QuestionFindManyQueryDto> {
  return {
    id: mockQuestionIdFactory(),
    title: mockQuestionTitleFactory(),
    text: mockQuestionTextFactory(),
    populate: [
      'parentQuestion',
      'tags',
          'answerAsQuestion',
          'messageAsQuestions',
          'openQuestionAsQuestion',
          'questionAsParentQuestion',
    ],
    sort: 'id',
    order: 'asc',
    take: 20,
    skip: 0,
    ...override,
  };
}
