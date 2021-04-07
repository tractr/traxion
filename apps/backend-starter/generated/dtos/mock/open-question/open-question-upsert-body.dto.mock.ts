import { OpenQuestionUpsertBodyDto } from '../../dtos';

import {
  mockOpenQuestionTextFactory,
  mockOpenQuestionKeyFactory,
  mockOpenQuestionQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionUpsertBodyDtoFactory(
  override: Partial<OpenQuestionUpsertBodyDto> = {}
): Required< OpenQuestionUpsertBodyDto> {
  return {
    text: mockOpenQuestionTextFactory(),
    key: mockOpenQuestionKeyFactory(),
    question: mockOpenQuestionQuestionIdFactory(),
    ...override,
  };
}
