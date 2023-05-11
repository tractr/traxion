import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './graphql.module-definition';
import {
  ProfileResolver,
  RightResolver,
  RoleResolver,
  UserResolver,
} from './resolvers';

import { DateScalar } from '@trxn/nestjs-graphql';

const providers = [
  DateScalar,
  UserResolver,
  ProfileResolver,
  RoleResolver,
  RightResolver,
];

@Module({ providers, exports: providers })
export class GraphqlModule extends ConfigurableModuleClass {}
