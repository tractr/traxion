import { QuestionCountQueryDto } from '../../dtos';

import {
  mockQuestionIdFactory,
  mockQuestionTitleFactory,
  mockQuestionTextFactory,
} from '@generated/models';

export function mockQuestionCountQueryDtoFactory(
  override: Partial<QuestionCountQueryDto> = {}
): Required< QuestionCountQueryDto> {
  return {
    id: mockQuestionIdFactory(),
    title: mockQuestionTitleFactory(),
    text: mockQuestionTextFactory(),
    ...override,
  };
}
