import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RightCount {
  @Field(() => Int, { nullable: false })
  roles?: number;
}
