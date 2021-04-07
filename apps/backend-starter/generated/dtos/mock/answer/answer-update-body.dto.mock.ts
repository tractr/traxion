import { AnswerUpdateBodyDto } from '../../dtos';

import {
  mockAnswerUserIdFactory,
  mockAnswerQuestionIdFactory,
  mockAnswerTagsIdsFactory,
} from '@generated/models';

export function mockAnswerUpdateBodyDtoFactory(
  override: Partial<AnswerUpdateBodyDto> = {}
): Required< AnswerUpdateBodyDto> {
  return {
    user: mockAnswerUserIdFactory(),
    question: mockAnswerQuestionIdFactory(),
    tags: mockAnswerTagsIdsFactory(),
    ...override,
  };
}
