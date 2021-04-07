import { OpenQuestionFindUniqueParamsDto } from '../../dtos';

import {
  mockOpenQuestionIdFactory,
} from '@generated/models';

export function mockOpenQuestionFindUniqueParamsDtoFactory(
    override: Partial<OpenQuestionFindUniqueParamsDto> = {}
): OpenQuestionFindUniqueParamsDto {
  return {
    id: mockOpenQuestionIdFactory(),
  ...override,
  };
}
