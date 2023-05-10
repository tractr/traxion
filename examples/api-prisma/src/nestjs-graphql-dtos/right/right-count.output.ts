import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RightCount {
  @Field(() => Int, { nullable: false })
  roles?: number;
}
