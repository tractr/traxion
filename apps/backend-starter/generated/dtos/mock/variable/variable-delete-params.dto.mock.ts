import { VariableDeleteParamsDto } from '../../dtos';

import {
  mockVariableIdFactory,
} from '@generated/models';

export function mockVariableDeleteParamsDtoFactory(
    override: Partial<VariableDeleteParamsDto> = {}
): VariableDeleteParamsDto {
  return {
    id: mockVariableIdFactory(),
  ...override,
  };
}
