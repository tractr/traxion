import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightUpdateInput } from './right-update.input';
import { Type } from 'class-transformer';
import { RightWhereUniqueInput } from './right-where-unique.input';

@ArgsType()
export class UpdateOneRightArgs {

    @Field(() => RightUpdateInput, {nullable:false})
    @Type(() => RightUpdateInput)
    data!: RightUpdateInput;

    @Field(() => RightWhereUniqueInput, {nullable:false})
    @Type(() => RightWhereUniqueInput)
    where!: RightWhereUniqueInput;
}
