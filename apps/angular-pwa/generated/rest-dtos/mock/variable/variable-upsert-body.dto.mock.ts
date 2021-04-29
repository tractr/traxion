import { VariableUpsertBodyDto } from '../../dtos';

import {
  mockVariableValueFactory,
  mockVariableOpenQuestionIdFactory,
  mockVariableAnswerIdFactory,
} from '@generated/models';

export function mockVariableUpsertBodyDtoFactory(
  override: Partial<VariableUpsertBodyDto> = {}
): Required< VariableUpsertBodyDto> {
  return {
    value: mockVariableValueFactory(),
    openQuestion: mockVariableOpenQuestionIdFactory(),
    answer: mockVariableAnswerIdFactory(),
    ...override,
  };
}
