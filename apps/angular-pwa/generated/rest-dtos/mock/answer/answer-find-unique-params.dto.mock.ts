import { AnswerFindUniqueParamsDto } from '../../dtos';

import {
  mockAnswerIdFactory,
} from '@generated/models';

export function mockAnswerFindUniqueParamsDtoFactory(
    override: Partial<AnswerFindUniqueParamsDto> = {}
): AnswerFindUniqueParamsDto {
  return {
    id: mockAnswerIdFactory(),
  ...override,
  };
}
