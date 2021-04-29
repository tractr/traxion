import { VariableFindUniqueParamsDto } from '../../dtos';

import {
  mockVariableIdFactory,
} from '@generated/models';

export function mockVariableFindUniqueParamsDtoFactory(
    override: Partial<VariableFindUniqueParamsDto> = {}
): VariableFindUniqueParamsDto {
  return {
    id: mockVariableIdFactory(),
  ...override,
  };
}
