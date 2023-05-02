import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightWhereUniqueInput } from './right-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueRightOrThrowArgs {

    @Field(() => RightWhereUniqueInput, {nullable:false})
    @Type(() => RightWhereUniqueInput)
    where!: RightWhereUniqueInput;
}
