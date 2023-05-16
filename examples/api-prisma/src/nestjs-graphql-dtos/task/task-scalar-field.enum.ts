import { registerEnumType } from '@nestjs/graphql';

export enum TaskScalarFieldEnum {
  id = 'id',
  title = 'title',
  description = 'description',
  status = 'status',
  authorId = 'authorId',
}

registerEnumType(TaskScalarFieldEnum, {
  name: 'TaskScalarFieldEnum',
  description: undefined,
});
