import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindManyPagination {
  /**
   * The number of results returned by the query.
   */
  @Field(() => Int, {
    description: 'The number of results returned by the query.',
  })
  count!: number;

  @Field(() => String, {
    nullable: true,
    description: 'The cursor to use in the next query.',
  })
  cursor?: string;

  @Field(() => Boolean, {
    description: 'Whether or not there are more results.',
  })
  hasNextPage!: boolean;
}
