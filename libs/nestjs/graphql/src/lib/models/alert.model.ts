import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Alert {
  @Field(() => String)
  camera: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  time: string;
}
