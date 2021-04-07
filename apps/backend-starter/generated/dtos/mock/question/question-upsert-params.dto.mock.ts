import { QuestionUpsertParamsDto } from '../../dtos';

import {
  mockQuestionIdFactory,
} from '@generated/models';

export function mockQuestionUpsertParamsDtoFactory(
    override: Partial<QuestionUpsertParamsDto> = {}
): QuestionUpsertParamsDto {
  return {
    id: mockQuestionIdFactory(),
  ...override,
  };
}
