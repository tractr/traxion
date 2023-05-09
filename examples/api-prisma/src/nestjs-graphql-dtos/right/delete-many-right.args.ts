import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightWhereInput } from './right-where.input';

@ArgsType()
export class DeleteManyRightArgs {
  @Field(() => RightWhereInput, { nullable: true })
  @Type(() => RightWhereInput)
  where?: RightWhereInput;
}
