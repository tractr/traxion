import { AnswerCountQueryDto } from '../../dtos';

import {
  mockAnswerIdFactory,
} from '@generated/models';

export function mockAnswerCountQueryDtoFactory(
  override: Partial<AnswerCountQueryDto> = {}
): Required< AnswerCountQueryDto> {
  return {
    id: mockAnswerIdFactory(),
    ...override,
  };
}
