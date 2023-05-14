import { constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function updateMethods(model: Model, resolver: ClassDeclaration) {
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelConstant = constant(model.name);

  // Format method data
  const methodsToUpdate = [
    {
      methodName: `findUnique${modelPascal}`,
      accessPolicy: `READ_${modelConstant}`,
    },
    {
      methodName: `findMany${modelPluralPascal}`,
      accessPolicy: `SEARCH_${modelConstant}`,
    },
    {
      methodName: `create${modelPascal}`,
      accessPolicy: `CREATE_${modelConstant}`,
    },
    {
      methodName: `update${modelPascal}`,
      accessPolicy: `UPDATE_${modelConstant}`,
    },
    {
      methodName: `delete${modelPascal}`,
      accessPolicy: `DELETE_${modelConstant}`,
    },
  ];

  methodsToUpdate.forEach(({ methodName, accessPolicy }) => {
    // Get method
    const method = resolver.getInstanceMethod(methodName);

    if (!method)
      throw new Error(
        `Method ${methodName} not found in ${resolver.getName()}`,
      );

    // Add policy decorator
    method.addDecorators([
      {
        name: 'Policies',
        arguments: [accessPolicy],
      },
    ]);

    // Add abilities parameter
    method.addParameters([
      {
        kind: StructureKind.Parameter,
        name: 'abilities',
        type: `PureAbility<
          any,
          PrismaQuery<Record<string, any> & ForcedSubject<string>>
        >`,
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
