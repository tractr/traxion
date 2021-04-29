import { TagCountQueryDto } from '../../dtos';

import {
  mockTagIdFactory,
  mockTagLabelFactory,
} from '@generated/models';

export function mockTagCountQueryDtoFactory(
  override: Partial<TagCountQueryDto> = {}
): Required< TagCountQueryDto> {
  return {
    id: mockTagIdFactory(),
    label: mockTagLabelFactory(),
    ...override,
  };
}
