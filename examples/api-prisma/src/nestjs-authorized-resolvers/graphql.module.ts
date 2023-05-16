import { Module } from '@nestjs/common';
import { DateScalar } from '@trxn/nestjs-graphql';
import { UserResolver, TaskResolver } from './resolvers';
import { ConfigurableModuleClass } from './graphql.module-definition';

const providers = [DateScalar, UserResolver, TaskResolver];

@Module({ providers, exports: providers })
export class GraphqlModule extends ConfigurableModuleClass {}
