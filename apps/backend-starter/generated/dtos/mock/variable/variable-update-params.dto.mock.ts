import { VariableUpdateParamsDto } from '../../dtos';

import {
  mockVariableIdFactory,
} from '@generated/models';

export function mockVariableUpdateParamsDtoFactory(
    override: Partial<VariableUpdateParamsDto> = {}
): VariableUpdateParamsDto {
  return {
    id: mockVariableIdFactory(),
  ...override,
  };
}
