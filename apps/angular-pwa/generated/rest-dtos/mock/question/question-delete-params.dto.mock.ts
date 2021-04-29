import { QuestionDeleteParamsDto } from '../../dtos';

import {
  mockQuestionIdFactory,
} from '@generated/models';

export function mockQuestionDeleteParamsDtoFactory(
    override: Partial<QuestionDeleteParamsDto> = {}
): QuestionDeleteParamsDto {
  return {
    id: mockQuestionIdFactory(),
  ...override,
  };
}
