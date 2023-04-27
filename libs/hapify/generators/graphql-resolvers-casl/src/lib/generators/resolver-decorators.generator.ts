import { constant, pascal } from 'case';
import { ClassDeclaration, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateResolverDecorators(
  model: Model,
  resolver: ClassDeclaration,
) {
  const modelPascal = pascal(model.name);
  const modelPluralPascal = pascal(model.pluralName);
  const modelConstant = constant(model.name);

  resolver.getMethod(`findUnique${modelPascal}`)?.addDecorator({
    name: 'Policies',
    arguments: [`Permission.READ_${modelConstant}`],
  });

  resolver.getMethod(`findMany${modelPluralPascal}`)?.addDecorator({
    name: 'Policies',
    arguments: [`Permission.READ_${modelConstant}`],
  });

  resolver.getMethod(`create${modelPascal}`)?.addDecorator({
    name: 'Policies',
    arguments: [`Permission.CREATE_${modelConstant}`],
  });

  resolver.getMethod(`update${modelPascal}`)?.addDecorator({
    name: 'Policies',
    arguments: [`Permission.UPDATE_${modelConstant}`],
  });

  resolver.getMethod(`delete${modelPascal}`)?.addDecorator({
    name: 'Policies',
    arguments: [`Permission.REMOVE_${modelConstant}`],
  });
}
