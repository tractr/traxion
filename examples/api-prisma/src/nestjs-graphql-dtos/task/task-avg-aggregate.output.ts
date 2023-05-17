import { Field , Float , ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  authorId?: number;
}
