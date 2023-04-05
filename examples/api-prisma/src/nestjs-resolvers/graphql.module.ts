import { Module } from '@nestjs/common';
import { DateScalar } from '@trxn/nestjs-graphql';

import { ConfigurableModuleClass } from './graphql.module-definition';
import { RightResolver, RoleResolver, UserResolver } from './resolvers';

const providers = [DateScalar, UserResolver, RoleResolver, RightResolver];

@Module({ providers, exports: providers })
export class GraphqlModule extends ConfigurableModuleClass {}
