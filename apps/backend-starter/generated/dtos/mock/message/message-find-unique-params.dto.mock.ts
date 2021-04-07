import { MessageFindUniqueParamsDto } from '../../dtos';

import {
  mockMessageIdFactory,
} from '@generated/models';

export function mockMessageFindUniqueParamsDtoFactory(
    override: Partial<MessageFindUniqueParamsDto> = {}
): MessageFindUniqueParamsDto {
  return {
    id: mockMessageIdFactory(),
  ...override,
  };
}
