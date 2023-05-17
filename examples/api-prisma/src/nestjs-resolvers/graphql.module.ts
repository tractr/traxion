import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './graphql.module-definition';
import { TaskResolver, UserResolver } from './resolvers';

import { DateScalar } from '@trxn/nestjs-graphql';

const providers = [DateScalar, UserResolver, TaskResolver];

@Module({ providers, exports: providers })
export class GraphqlModule extends ConfigurableModuleClass {}
