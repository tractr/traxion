import { camel, constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateFieldResolversMethod(
  model: Model,
  resolver: ClassDeclaration,
) {
  const modelCamel = camel(model.name);
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelConstant = constant(model.name);

  const fieldResolvers = resolver
    .getMethods()
    .filter((method) => !!method.getDecorator('ResolveField'));

  fieldResolvers.forEach((fieldResolver) => {
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
