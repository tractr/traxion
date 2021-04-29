import { OpenQuestionDeleteParamsDto } from '../../dtos';

import {
  mockOpenQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionDeleteParamsDtoFactory(
    override: Partial<OpenQuestionDeleteParamsDto> = {}
): OpenQuestionDeleteParamsDto {
  return {
    id: mockOpenQuestionIdFactory(),
  ...override,
  };
}
