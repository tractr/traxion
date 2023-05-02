import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class FindUniqueUserArgs {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: UserWhereUniqueInput;
}
