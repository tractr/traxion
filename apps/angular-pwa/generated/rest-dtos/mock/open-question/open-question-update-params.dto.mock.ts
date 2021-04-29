import { OpenQuestionUpdateParamsDto } from '../../dtos';

import {
  mockOpenQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionUpdateParamsDtoFactory(
    override: Partial<OpenQuestionUpdateParamsDto> = {}
): OpenQuestionUpdateParamsDto {
  return {
    id: mockOpenQuestionIdFactory(),
  ...override,
  };
}
