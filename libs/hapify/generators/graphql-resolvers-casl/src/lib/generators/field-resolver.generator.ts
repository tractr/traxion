import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function updateFieldResolvers(model: Model, resolver: ClassDeclaration) {
  const fieldResolvers = resolver
    .getInstanceMethods()
    .filter((method) => !!method.getDecorator('ResolveField'));

  fieldResolvers.forEach((fieldResolver) => {
    // Add abilities parameter
    fieldResolver.addParameters([
      {
        kind: StructureKind.Parameter,
        name: 'abilities',
        type: 'AnyAbility',
        decorators: [
          {
            name: 'CurrentAbilities',
            arguments: [],
          },
        ],
      },
    ]);
  });
}
