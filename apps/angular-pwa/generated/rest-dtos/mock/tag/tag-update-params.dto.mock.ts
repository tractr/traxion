import { TagUpdateParamsDto } from '../../dtos';

import {
  mockTagIdFactory,
} from '@generated/models';

export function mockTagUpdateParamsDtoFactory(
    override: Partial<TagUpdateParamsDto> = {}
): TagUpdateParamsDto {
  return {
    id: mockTagIdFactory(),
  ...override,
  };
}
