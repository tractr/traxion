import { TagUpsertParamsDto } from '../../dtos';

import {
  mockTagIdFactory,
} from '@generated/models';

export function mockTagUpsertParamsDtoFactory(
    override: Partial<TagUpsertParamsDto> = {}
): TagUpsertParamsDto {
  return {
    id: mockTagIdFactory(),
  ...override,
  };
}
