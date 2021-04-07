import { MessageCountQueryDto } from '../../dtos';

import {
  mockMessageIdFactory,
  mockMessageTextFactory,
} from '@generated/models';

export function mockMessageCountQueryDtoFactory(
  override: Partial<MessageCountQueryDto> = {}
): Required< MessageCountQueryDto> {
  return {
    id: mockMessageIdFactory(),
    text: mockMessageTextFactory(),
    ...override,
  };
}
