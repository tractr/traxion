import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Camera {
  @Field(() => String)
  id: string;

  @Field(() => String)
  status: string;
}
