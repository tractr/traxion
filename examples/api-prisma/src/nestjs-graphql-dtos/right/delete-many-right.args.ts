import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightWhereInput } from './right-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyRightArgs {
  @Field(() => RightWhereInput, { nullable: true })
  @Type(() => RightWhereInput)
  where?: RightWhereInput;
}
