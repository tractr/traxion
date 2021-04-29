
import { TagFindUniqueQueryDto } from '../../dtos';

   
export function mockTagFindUniqueQueryDtoFactory(
    override: Partial<TagFindUniqueQueryDto> = {}
): TagFindUniqueQueryDto {
  return {
    populate: [
          'answerAsTags',
          'messageAsTags',
          'questionAsTags',
    ],
  ...override,
  };
}
