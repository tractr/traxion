import { TagFindUniqueParamsDto } from '../../dtos';

import {
  mockTagIdFactory,
} from '@generated/models';

export function mockTagFindUniqueParamsDtoFactory(
    override: Partial<TagFindUniqueParamsDto> = {}
): TagFindUniqueParamsDto {
  return {
    id: mockTagIdFactory(),
  ...override,
  };
}
