import { Module } from '@nestjs/common';

import { UserResolver } from './resolvers';

import { ModelsModule } from '@tractr/generated-nestjs-models';

@Module({
  imports: [ModelsModule.register()],
  controllers: [],
  providers: [UserResolver],
})
export class GraphqlPOCModule {}
