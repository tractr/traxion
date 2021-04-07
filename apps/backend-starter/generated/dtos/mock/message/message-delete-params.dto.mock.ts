import { MessageDeleteParamsDto } from '../../dtos';

import {
  mockMessageIdFactory,
} from '@generated/models';

export function mockMessageDeleteParamsDtoFactory(
    override: Partial<MessageDeleteParamsDto> = {}
): MessageDeleteParamsDto {
  return {
    id: mockMessageIdFactory(),
  ...override,
  };
}
