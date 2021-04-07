import { QuestionUpdateBodyDto } from '../../dtos';

import {
  mockQuestionTitleFactory,
  mockQuestionTextFactory,
  mockQuestionParentQuestionIdFactory,
  mockQuestionTagsIdsFactory,
} from '@generated/models';

export function mockQuestionUpdateBodyDtoFactory(
  override: Partial<QuestionUpdateBodyDto> = {}
): Required< QuestionUpdateBodyDto> {
  return {
    title: mockQuestionTitleFactory(),
    text: mockQuestionTextFactory(),
    parentQuestion: mockQuestionParentQuestionIdFactory(),
    tags: mockQuestionTagsIdsFactory(),
    ...override,
  };
}
