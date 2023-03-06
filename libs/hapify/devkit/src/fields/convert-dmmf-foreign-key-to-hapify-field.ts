import { createDefaultConstraints, getPluralName } from '../constraints';
import { PrismaScalarField } from '../interfaces';

import { FieldDeclaration } from '@trxn/hapify-core';

export function convertDmmfForeignKeyToHapifyField(
  field: PrismaScalarField,
  metadata?: Record<string, unknown>,
  documentation?: string,
): FieldDeclaration {
  const { name, type } = field;
  if (['Int', 'BigInt', 'String'].indexOf(type) === -1) {
    throw new Error(`Unsupported foreign key field type: ${type}`);
  }

  const pluralName = getPluralName(field, metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);

  return {
    type: 'foreign',
    name,
    pluralName,
    documentation,
    ...baseConstraints,
    scalar: type === 'String' ? 'string' : 'number',
  };
}
