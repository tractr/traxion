import { QuestionFindUniqueParamsDto } from '../../dtos';

import {
  mockQuestionIdFactory,
} from '@generated/models';

export function mockQuestionFindUniqueParamsDtoFactory(
    override: Partial<QuestionFindUniqueParamsDto> = {}
): QuestionFindUniqueParamsDto {
  return {
    id: mockQuestionIdFactory(),
  ...override,
  };
}
