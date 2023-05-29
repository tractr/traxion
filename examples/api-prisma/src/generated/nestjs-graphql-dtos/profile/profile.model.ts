import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.model';

@ObjectType()
export class Profile {
  @Field(() => ID, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  firstName!: string;

  /**
   * @trxn/defaultSelect
   */
  @Field(() => String, { nullable: false, description: '@trxn/defaultSelect' })
  lastName!: string;

  @Field(() => String, { nullable: true })
  bio!: string | null;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => User, { nullable: false })
  user?: User;
}
