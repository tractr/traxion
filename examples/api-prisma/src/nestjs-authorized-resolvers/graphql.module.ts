import { Module } from '@nestjs/common';
import { DateScalar } from '@trxn/nestjs-graphql';
import { UserResolver, RoleResolver, RightResolver } from './resolvers';
import { ConfigurableModuleClass } from './graphql.module-definition';

const providers = [DateScalar, UserResolver, RoleResolver, RightResolver];

@Module({ providers: providers, exports: providers })
export class GraphqlModule extends ConfigurableModuleClass {}
