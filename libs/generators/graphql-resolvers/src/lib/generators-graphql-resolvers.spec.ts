import { generatorsGraphqlResolvers } from './generators-graphql-resolvers';

describe('generatorsGraphqlResolvers', () => {
  it('should work', () => {
    expect(generatorsGraphqlResolvers()).toEqual(
      'generators-graphql-resolvers',
    );
  });
});
