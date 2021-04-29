import { QuestionCreateBodyDto } from '../../dtos';

import {
  mockQuestionTitleFactory,
  mockQuestionTextFactory,
  mockQuestionParentQuestionIdFactory,
  mockQuestionTagsIdsFactory,
} from '@generated/models';

export function mockQuestionCreateBodyDtoFactory(
  override: Partial<QuestionCreateBodyDto> = {}
): Required< QuestionCreateBodyDto> {
  return {
    title: mockQuestionTitleFactory(),
    text: mockQuestionTextFactory(),
    parentQuestion: mockQuestionParentQuestionIdFactory(),
    tags: mockQuestionTagsIdsFactory(),
    ...override,
  };
}
