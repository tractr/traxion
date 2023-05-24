/* eslint-disable @typescript-eslint/no-misused-promises */
import { join } from 'path';

import { DataSource } from '@prisma/generator-helper';
import { Project } from 'ts-morph';

import { NestjsTraxionGeneratorConfig } from './config.types';

import { discoverOwnership, getUserModel, Schema } from '@trxn/hapify-core';
import { generate as hapifyCaslConfigGenerator } from '@trxn/hapify-generator-casl';
import { generate as hapifyNestjsAuthorizedGraphqlGenerator } from '@trxn/hapify-generator-nestjs-authorized-graphql-resolvers';
import { generate as hapifyNestjsAuthorizedServicesGenerator } from '@trxn/hapify-generator-nestjs-authorized-services';
import { generate as hapifyNestjsGraphqlDtosGenerator } from '@trxn/hapify-generator-nestjs-graphql-dtos';
import { generate as hapifyNestjsGraphqlGenerator } from '@trxn/hapify-generator-nestjs-graphql-resolvers';
import { generate as hapifyNestjsModulesGenerator } from '@trxn/hapify-generator-nestjs-modules';
import { generate as hapifyNestjsServicesGenerator } from '@trxn/hapify-generator-nestjs-services';

export async function generate(
  project: Project,
  schema: Schema,
  datasources: DataSource[],
  config: NestjsTraxionGeneratorConfig,
) {
  const { output, overwrite, userModelName } = config;

  const directory = project.getDirectory(join(output, 'nestjs-graphql-dtos'));

  if (!directory) {
    throw new Error('Directory not found');
  }

  hapifyNestjsGraphqlDtosGenerator(directory, schema);

  const userModel = getUserModel(schema, userModelName);

  const userWithOwnership = discoverOwnership(userModel, schema);

  hapifyCaslConfigGenerator(project, schema, userWithOwnership, {
    output: join(output, 'casl'),
    overwrite,
  });

  hapifyNestjsModulesGenerator(project, schema, {
    output: join(output, 'modules'),
    importPaths: {
      nestjsAuthorizedServices: './nestjs-authorized-services',
      nestjsGraphqlResolvers: './nestjs-authorized-graphql-resolvers',
      nestjsServices: './nestjs-services',
      casl: './casl',
    },
    overwrite,
  });

  hapifyNestjsGraphqlGenerator(project, schema, {
    output: join(output, 'nestjs-authorized-graphql-resolvers'),
    importPaths: {
      nestjsServices: './nestjs-services',
      graphqlDtos: './nestjs-graphql-dtos',
    },
  });
  hapifyNestjsAuthorizedGraphqlGenerator(project, schema, {
    output: join(output, 'nestjs-authorized-graphql-resolvers'),
    importPaths: {
      nestjsAuthorizedServices: './nestjs-authorized-services',
    },
    // overwrite,
  });

  hapifyNestjsAuthorizedServicesGenerator(project, schema, {
    output: join(output, 'nestjs-authorized-services'),
    importPaths: {
      nestjsServices: './nestjs-services',
    },
    overwrite,
  });

  hapifyNestjsServicesGenerator(project, schema, datasources, {
    output: join(output, 'nestjs-services'),
    overwrite,
  });
}
