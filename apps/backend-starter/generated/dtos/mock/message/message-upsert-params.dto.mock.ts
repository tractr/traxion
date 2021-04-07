import { MessageUpsertParamsDto } from '../../dtos';

import {
  mockMessageIdFactory,
} from '@generated/models';

export function mockMessageUpsertParamsDtoFactory(
    override: Partial<MessageUpsertParamsDto> = {}
): MessageUpsertParamsDto {
  return {
    id: mockMessageIdFactory(),
  ...override,
  };
}
