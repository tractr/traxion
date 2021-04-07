import { AnswerCreateBodyDto } from '../../dtos';

import {
  mockAnswerUserIdFactory,
  mockAnswerQuestionIdFactory,
  mockAnswerTagsIdsFactory,
} from '@generated/models';

export function mockAnswerCreateBodyDtoFactory(
  override: Partial<AnswerCreateBodyDto> = {}
): Required< AnswerCreateBodyDto> {
  return {
    user: mockAnswerUserIdFactory(),
    question: mockAnswerQuestionIdFactory(),
    tags: mockAnswerTagsIdsFactory(),
    ...override,
  };
}
