import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Alert {
  @Field(() => String)
  id: string;
}
