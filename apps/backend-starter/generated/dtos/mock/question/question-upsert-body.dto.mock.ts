import { QuestionUpsertBodyDto } from '../../dtos';

import {
  mockQuestionTitleFactory,
  mockQuestionTextFactory,
  mockQuestionParentQuestionIdFactory,
  mockQuestionTagsIdsFactory,
} from '@generated/models';

export function mockQuestionUpsertBodyDtoFactory(
  override: Partial<QuestionUpsertBodyDto> = {}
): Required< QuestionUpsertBodyDto> {
  return {
    title: mockQuestionTitleFactory(),
    text: mockQuestionTextFactory(),
    parentQuestion: mockQuestionParentQuestionIdFactory(),
    tags: mockQuestionTagsIdsFactory(),
    ...override,
  };
}
