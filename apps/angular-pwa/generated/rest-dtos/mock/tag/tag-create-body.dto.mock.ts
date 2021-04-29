import { TagCreateBodyDto } from '../../dtos';

import {
  mockTagLabelFactory,
} from '@generated/models';

export function mockTagCreateBodyDtoFactory(
  override: Partial<TagCreateBodyDto> = {}
): Required< TagCreateBodyDto> {
  return {
    label: mockTagLabelFactory(),
    ...override,
  };
}
