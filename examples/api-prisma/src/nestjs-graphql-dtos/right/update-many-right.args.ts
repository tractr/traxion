import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RightUpdateManyMutationInput } from './right-update-many-mutation.input';
import { Type } from 'class-transformer';
import { RightWhereInput } from './right-where.input';

@ArgsType()
export class UpdateManyRightArgs {

    @Field(() => RightUpdateManyMutationInput, {nullable:false})
    @Type(() => RightUpdateManyMutationInput)
    data!: RightUpdateManyMutationInput;

    @Field(() => RightWhereInput, {nullable:true})
    @Type(() => RightWhereInput)
    where?: RightWhereInput;
}
