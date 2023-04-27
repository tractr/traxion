import { hapifyPrismaNestjsGraphqlResolversCaslGenerator } from './hapify-prisma-nestjs-graphql-resolvers-casl-generator';

describe('hapifyPrismaNestjsGraphqlResolversCaslGenerator', () => {
  it('should work', () => {
    expect(hapifyPrismaNestjsGraphqlResolversCaslGenerator()).toEqual(
      'hapify-prisma-nestjs-graphql-resolvers-casl-generator',
    );
  });
});
