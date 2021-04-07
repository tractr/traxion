import { TagUpsertBodyDto } from '../../dtos';

import {
  mockTagLabelFactory,
} from '@generated/models';

export function mockTagUpsertBodyDtoFactory(
  override: Partial<TagUpsertBodyDto> = {}
): Required< TagUpsertBodyDto> {
  return {
    label: mockTagLabelFactory(),
    ...override,
  };
}
