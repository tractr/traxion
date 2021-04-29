import { OpenQuestionUpsertParamsDto } from '../../dtos';

import {
  mockOpenQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionUpsertParamsDtoFactory(
    override: Partial<OpenQuestionUpsertParamsDto> = {}
): OpenQuestionUpsertParamsDto {
  return {
    id: mockOpenQuestionIdFactory(),
  ...override,
  };
}
