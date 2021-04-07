import { MessageUpdateBodyDto } from '../../dtos';

import {
  mockMessageTextFactory,
  mockMessageHourFactory,
  mockMessageTagsIdsFactory,
  mockMessageQuestionsIdsFactory,
} from '@generated/models';

export function mockMessageUpdateBodyDtoFactory(
  override: Partial<MessageUpdateBodyDto> = {}
): Required< MessageUpdateBodyDto> {
  return {
    text: mockMessageTextFactory(),
    hour: mockMessageHourFactory(),
    tags: mockMessageTagsIdsFactory(),
    questions: mockMessageQuestionsIdsFactory(),
    ...override,
  };
}
