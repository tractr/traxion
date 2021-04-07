import { VariableCreateBodyDto } from '../../dtos';

import {
  mockVariableValueFactory,
  mockVariableOpenQuestionIdFactory,
  mockVariableAnswerIdFactory,
} from '@generated/models';

export function mockVariableCreateBodyDtoFactory(
  override: Partial<VariableCreateBodyDto> = {}
): Required< VariableCreateBodyDto> {
  return {
    value: mockVariableValueFactory(),
    openQuestion: mockVariableOpenQuestionIdFactory(),
    answer: mockVariableAnswerIdFactory(),
    ...override,
  };
}
