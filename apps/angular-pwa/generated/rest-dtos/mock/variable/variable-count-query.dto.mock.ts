import { VariableCountQueryDto } from '../../dtos';

import {
  mockVariableIdFactory,
} from '@generated/models';

export function mockVariableCountQueryDtoFactory(
  override: Partial<VariableCountQueryDto> = {}
): Required< VariableCountQueryDto> {
  return {
    id: mockVariableIdFactory(),
    ...override,
  };
}
