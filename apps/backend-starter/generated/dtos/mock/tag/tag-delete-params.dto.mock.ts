import { TagDeleteParamsDto } from '../../dtos';

import {
  mockTagIdFactory,
} from '@generated/models';

export function mockTagDeleteParamsDtoFactory(
    override: Partial<TagDeleteParamsDto> = {}
): TagDeleteParamsDto {
  return {
    id: mockTagIdFactory(),
  ...override,
  };
}
