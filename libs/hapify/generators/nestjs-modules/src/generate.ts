/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { NestjsModulesGeneratorConfig } from './config.types';
import {
  generateAuthenticationModuleSourceFile,
  generateDatabaseModuleSourceFile,
  generateGraphqlModuleSourceFile,
  generateNestjsAuthorizedServicesModuleSourceFile,
  generateServicesModuleSourceFile,
  generateUserModuleSourceFile,
} from './generators';

export function hapifyNestjsModulesGenerator(
  project: Project,
  config: NestjsModulesGeneratorConfig,
) {
  const { output, importPaths } = config;

  generateAuthenticationModuleSourceFile(project, output);
  generateNestjsAuthorizedServicesModuleSourceFile(
    project,
    output,
    importPaths,
  );
  generateDatabaseModuleSourceFile(project, output);
  generateGraphqlModuleSourceFile(project, output, importPaths);
  generateServicesModuleSourceFile(project, output, importPaths);
  generateUserModuleSourceFile(project, output);
}
