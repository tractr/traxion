import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './graphql.module-definition';
import { UserResolver, RoleResolver, RightResolver } from './resolvers';

import { DateScalar } from '@trxn/nestjs-graphql';

const providers = [DateScalar, UserResolver, RoleResolver, RightResolver];

@Module({ providers: providers, exports: providers })
export class GraphqlModule extends ConfigurableModuleClass {}
