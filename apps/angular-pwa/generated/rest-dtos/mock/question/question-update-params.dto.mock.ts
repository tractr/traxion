import { QuestionUpdateParamsDto } from '../../dtos';

import {
  mockQuestionIdFactory,
} from '@generated/models';

export function mockQuestionUpdateParamsDtoFactory(
    override: Partial<QuestionUpdateParamsDto> = {}
): QuestionUpdateParamsDto {
  return {
    id: mockQuestionIdFactory(),
  ...override,
  };
}
