import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class RightAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;
}
