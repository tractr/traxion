import { AnswerUpsertBodyDto } from '../../dtos';

import {
  mockAnswerUserIdFactory,
  mockAnswerQuestionIdFactory,
  mockAnswerTagsIdsFactory,
} from '@generated/models';

export function mockAnswerUpsertBodyDtoFactory(
  override: Partial<AnswerUpsertBodyDto> = {}
): Required< AnswerUpsertBodyDto> {
  return {
    user: mockAnswerUserIdFactory(),
    question: mockAnswerQuestionIdFactory(),
    tags: mockAnswerTagsIdsFactory(),
    ...override,
  };
}
