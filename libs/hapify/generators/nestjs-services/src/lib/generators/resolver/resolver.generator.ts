import { Project } from 'ts-morph';

import { generateImports } from './imports.generator';

import { camel, Model } from '@trxn/hapify-core';

export function generateResolverSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `get-prisma-${camel(model.name)}-query.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  // const resolverClass = generateResolverClass(model);
  const imports = generateImports(model);
  // const method = generatePrismaSelectMethod(model);
  // sourceFile.addFunction(method);
  sourceFile.addImportDeclarations(imports);
}
