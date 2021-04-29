
import { MessageFindUniqueQueryDto } from '../../dtos';

   
export function mockMessageFindUniqueQueryDtoFactory(
    override: Partial<MessageFindUniqueQueryDto> = {}
): MessageFindUniqueQueryDto {
  return {
    populate: [
      'tags',
      'questions',
    ],
  ...override,
  };
}
