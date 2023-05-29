/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { NestjsModulesGeneratorConfig } from './config.types';
import {
  generateAuthenticationModuleSourceFile,
  generateDatabaseModuleSourceFile,
  generateGraphqlModuleSourceFile,
  generateNestjsAuthorizedServicesModuleSourceFile,
  generateServicesModuleSourceFile,
  generateTraxionModuleSourceFile,
  generateUserModuleSourceFile,
} from './generators';
import { generateCaslConfigSourceFile } from './generators/casl-config.generator';
import { generateLoginResolverSourceFile } from './generators/login-resolver.generator';

import { Schema } from '@trxn/hapify-core';

export function generate(
  project: Project,
  schema: Schema,
  config: NestjsModulesGeneratorConfig,
) {
  const { output, importPaths } = config;

  generateAuthenticationModuleSourceFile(project, output, importPaths);
  generateNestjsAuthorizedServicesModuleSourceFile(
    project,
    output,
    importPaths,
  );
  generateDatabaseModuleSourceFile(project, output);
  generateGraphqlModuleSourceFile(project, output, importPaths);
  generateServicesModuleSourceFile(project, output, importPaths);
  generateUserModuleSourceFile(project, output);
  generateTraxionModuleSourceFile(project, output);

  generateLoginResolverSourceFile(project, schema, output, importPaths);

  // Generate the casl config only if no one is specified
  if (!importPaths.caslAppConfig) {
    generateCaslConfigSourceFile(project, schema, output, importPaths);
  }
}
