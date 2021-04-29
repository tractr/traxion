import { MessageUpdateParamsDto } from '../../dtos';

import {
  mockMessageIdFactory,
} from '@generated/models';

export function mockMessageUpdateParamsDtoFactory(
    override: Partial<MessageUpdateParamsDto> = {}
): MessageUpdateParamsDto {
  return {
    id: mockMessageIdFactory(),
  ...override,
  };
}
