import { kebab } from 'case';
import { Project } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

// TODO: we could create helpers in devkit to generate barrel export files
export function generateResolverIndexSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/resolvers/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = models.map((model) => ({
    moduleSpecifier: `./${kebab(model.name)}.resolver`,
  }));

  sourceFile.addExportDeclarations(exportDeclarations);
}

export function generateDtoIndexSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/dtos/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const exportDeclarations = models.map((model) => ({
    moduleSpecifier: `./find-many-${kebab(model.name)}-output.dto`,
  }));

  sourceFile.addExportDeclarations(exportDeclarations);
}

export function generateRootIndexSourceFile(
  project: Project,
  models: Model[],
  path: string,
) {
  const fileName = 'index.ts';
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addExportDeclarations([
    { moduleSpecifier: './resolvers' },
    { moduleSpecifier: './dtos' },
    { moduleSpecifier: './graphql.module' },
  ]);
}
