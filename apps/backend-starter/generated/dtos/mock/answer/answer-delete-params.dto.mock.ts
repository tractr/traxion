import { AnswerDeleteParamsDto } from '../../dtos';

import {
  mockAnswerIdFactory,
} from '@generated/models';

export function mockAnswerDeleteParamsDtoFactory(
    override: Partial<AnswerDeleteParamsDto> = {}
): AnswerDeleteParamsDto {
  return {
    id: mockAnswerIdFactory(),
  ...override,
  };
}
