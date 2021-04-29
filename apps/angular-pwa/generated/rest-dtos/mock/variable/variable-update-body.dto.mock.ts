import { VariableUpdateBodyDto } from '../../dtos';

import {
  mockVariableValueFactory,
  mockVariableOpenQuestionIdFactory,
  mockVariableAnswerIdFactory,
} from '@generated/models';

export function mockVariableUpdateBodyDtoFactory(
  override: Partial<VariableUpdateBodyDto> = {}
): Required< VariableUpdateBodyDto> {
  return {
    value: mockVariableValueFactory(),
    openQuestion: mockVariableOpenQuestionIdFactory(),
    answer: mockVariableAnswerIdFactory(),
    ...override,
  };
}
