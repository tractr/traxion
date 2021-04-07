import { OpenQuestionCreateBodyDto } from '../../dtos';

import {
  mockOpenQuestionTextFactory,
  mockOpenQuestionKeyFactory,
  mockOpenQuestionQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionCreateBodyDtoFactory(
  override: Partial<OpenQuestionCreateBodyDto> = {}
): Required< OpenQuestionCreateBodyDto> {
  return {
    text: mockOpenQuestionTextFactory(),
    key: mockOpenQuestionKeyFactory(),
    question: mockOpenQuestionQuestionIdFactory(),
    ...override,
  };
}
