import { AnswerUpsertParamsDto } from '../../dtos';

import {
  mockAnswerIdFactory,
} from '@generated/models';

export function mockAnswerUpsertParamsDtoFactory(
    override: Partial<AnswerUpsertParamsDto> = {}
): AnswerUpsertParamsDto {
  return {
    id: mockAnswerIdFactory(),
  ...override,
  };
}
