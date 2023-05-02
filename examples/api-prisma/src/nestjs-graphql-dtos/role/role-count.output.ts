import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RoleCount {
  @Field(() => Int, { nullable: false })
  users?: number;

  @Field(() => Int, { nullable: false })
  rights?: number;
}
