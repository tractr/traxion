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

export function generate(
  project: Project,
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

  // Generate the casl config only if no one is specified
  if (!importPaths.caslAppConfig) {
    generateCaslConfigSourceFile(project, output, importPaths);
  }
}
