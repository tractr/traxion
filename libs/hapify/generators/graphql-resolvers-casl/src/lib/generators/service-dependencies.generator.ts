import { camel, pascal } from 'case';
import { ClassDeclaration, Scope, SyntaxKind } from 'ts-morph';

import { getAllModelsFromRelation, Model } from '@trxn/hapify-core';

export function updateServiceDependencies(
  model: Model,
  resolver: ClassDeclaration,
) {
  // Get resolver constructor
  const constructor = resolver.getConstructors()[0];

  if (!constructor)
    throw new Error(`Constructor not found in ${resolver.getName()}`);

  const propertiesToUpdate = [model, ...getAllModelsFromRelation(model)].map(
    (m) => ({
      modelServiceName: `${camel(m.name)}Service`,
      modelAuthorizedServiceName: `${camel(m.name)}AuthorizedService`,
      modelAuthorizedServiceType: `${pascal(m.name)}AuthorizedService`,
    }),
  );

  propertiesToUpdate.forEach(
    ({
      modelAuthorizedServiceName,
      modelAuthorizedServiceType,
      modelServiceName,
    }) => {
      // Get constructor parameter
      const constructorParam = constructor.getParameter(modelServiceName);

      if (!constructorParam)
        throw new Error(
          `Parameter ${modelServiceName} not found in ${resolver.getName()} constructor`,
        );

      // Rename parameter
      constructorParam.rename(modelAuthorizedServiceName);

      // Update parameter type
      constructorParam.setType(modelAuthorizedServiceType);

      // Update new services call signature
      constructorParam.findReferencesAsNodes().forEach((node) => {
        const callExpression = node.getFirstAncestorByKind(
          SyntaxKind.CallExpression,
        );

        if (callExpression) {
          callExpression.addArgument('abilities');
        }
      });
    },
  );

  constructor.addParameter({
    name: 'defaultFields',
    type: 'DefaultOwnershipSelect',
    isReadonly: true,
    scope: Scope.Private,
    decorators: [
      {
        name: 'Inject',
        arguments: ['DEFAULT_OWNERSHIP_SELECT'],
      },
    ],
  });
}
