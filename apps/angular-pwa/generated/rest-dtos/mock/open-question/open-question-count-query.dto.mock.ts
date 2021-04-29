import { OpenQuestionCountQueryDto } from '../../dtos';

import {
  mockOpenQuestionIdFactory,
  mockOpenQuestionTextFactory,
  mockOpenQuestionKeyFactory,
} from '@generated/models';

export function mockOpenQuestionCountQueryDtoFactory(
  override: Partial<OpenQuestionCountQueryDto> = {}
): Required< OpenQuestionCountQueryDto> {
  return {
    id: mockOpenQuestionIdFactory(),
    text: mockOpenQuestionTextFactory(),
    key: mockOpenQuestionKeyFactory(),
    ...override,
  };
}
