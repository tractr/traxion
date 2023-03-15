import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RightUpdateInput } from './right-update.input';
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
