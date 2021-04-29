import { OpenQuestionUpdateBodyDto } from '../../dtos';

import {
  mockOpenQuestionTextFactory,
  mockOpenQuestionKeyFactory,
  mockOpenQuestionQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionUpdateBodyDtoFactory(
  override: Partial<OpenQuestionUpdateBodyDto> = {}
): Required< OpenQuestionUpdateBodyDto> {
  return {
    text: mockOpenQuestionTextFactory(),
    key: mockOpenQuestionKeyFactory(),
    question: mockOpenQuestionQuestionIdFactory(),
    ...override,
  };
}
