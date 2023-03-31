import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RightUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
