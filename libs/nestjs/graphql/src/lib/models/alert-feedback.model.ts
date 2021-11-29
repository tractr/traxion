import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AlertFeedback {
  @Field(() => String)
  id: string;

  @Field(() => String)
  alertId: string;
}
