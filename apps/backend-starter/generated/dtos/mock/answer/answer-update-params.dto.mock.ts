import { AnswerUpdateParamsDto } from '../../dtos';

import {
  mockAnswerIdFactory,
} from '@generated/models';

export function mockAnswerUpdateParamsDtoFactory(
    override: Partial<AnswerUpdateParamsDto> = {}
): AnswerUpdateParamsDto {
  return {
    id: mockAnswerIdFactory(),
  ...override,
  };
}
