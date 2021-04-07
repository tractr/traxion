
import { VariableFindUniqueQueryDto } from '../../dtos';

   
export function mockVariableFindUniqueQueryDtoFactory(
    override: Partial<VariableFindUniqueQueryDto> = {}
): VariableFindUniqueQueryDto {
  return {
    populate: [
      'openQuestion',
      'answer',
    ],
  ...override,
  };
}
