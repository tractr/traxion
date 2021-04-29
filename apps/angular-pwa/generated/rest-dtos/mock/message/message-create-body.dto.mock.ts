import { MessageCreateBodyDto } from '../../dtos';

import {
  mockMessageTextFactory,
  mockMessageHourFactory,
  mockMessageTagsIdsFactory,
  mockMessageQuestionsIdsFactory,
} from '@generated/models';

export function mockMessageCreateBodyDtoFactory(
  override: Partial<MessageCreateBodyDto> = {}
): Required< MessageCreateBodyDto> {
  return {
    text: mockMessageTextFactory(),
    hour: mockMessageHourFactory(),
    tags: mockMessageTagsIdsFactory(),
    questions: mockMessageQuestionsIdsFactory(),
    ...override,
  };
}
