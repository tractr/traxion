import { TagUpdateBodyDto } from '../../dtos';

import {
  mockTagLabelFactory,
} from '@generated/models';

export function mockTagUpdateBodyDtoFactory(
  override: Partial<TagUpdateBodyDto> = {}
): Required< TagUpdateBodyDto> {
  return {
    label: mockTagLabelFactory(),
    ...override,
  };
}
