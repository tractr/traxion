import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './graphql.module-definition';
import { RightResolver, RoleResolver, UserResolver } from './resolvers';

import { DateScalar } from '@trxn/nestjs-graphql';

const providers = [DateScalar, UserResolver, RoleResolver, RightResolver];

@Module({ providers, exports: providers })
export class GraphqlAuthorizationModule extends ConfigurableModuleClass {}
