import { Field , Int , ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskCount {
  @Field(() => Int, { nullable: false })
  sharedWith?: number;
}
