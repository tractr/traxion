import { VariableUpsertParamsDto } from '../../dtos';

import {
  mockVariableIdFactory,
} from '@generated/models';

export function mockVariableUpsertParamsDtoFactory(
    override: Partial<VariableUpsertParamsDto> = {}
): VariableUpsertParamsDto {
  return {
    id: mockVariableIdFactory(),
  ...override,
  };
}
