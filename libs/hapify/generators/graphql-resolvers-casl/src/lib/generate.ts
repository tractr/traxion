import { Project } from 'ts-morph';

import { GraphqlResolverGeneratorConfig } from './config.type';

import { Schema } from '@trxn/hapify-core';

export function generate(
  project: Project,
  dataModel: Schema,
  config: GraphqlResolverGeneratorConfig,
) {
  const { output, importPaths } = config;

  const classes = project
    .getDirectory(output)
    ?.getDescendantSourceFiles()
    .flatMap((sourceFile) => sourceFile.getClasses());

  if (classes)
    classes
      .flatMap((classDeclaration) => classDeclaration.getMethods())
      .forEach((method) =>
        method.addDecorator({
          name: 'CheckAuth',
          arguments: [],
        }),
      );
}
