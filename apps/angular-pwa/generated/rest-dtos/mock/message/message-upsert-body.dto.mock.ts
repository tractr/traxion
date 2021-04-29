import { MessageUpsertBodyDto } from '../../dtos';

import {
  mockMessageTextFactory,
  mockMessageHourFactory,
  mockMessageTagsIdsFactory,
  mockMessageQuestionsIdsFactory,
} from '@generated/models';

export function mockMessageUpsertBodyDtoFactory(
  override: Partial<MessageUpsertBodyDto> = {}
): Required< MessageUpsertBodyDto> {
  return {
    text: mockMessageTextFactory(),
    hour: mockMessageHourFactory(),
    tags: mockMessageTagsIdsFactory(),
    questions: mockMessageQuestionsIdsFactory(),
    ...override,
  };
}
