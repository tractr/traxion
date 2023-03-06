import {
  createDefaultConstraints,
  createPrimaryConstraints,
  getPluralName,
} from '../constraints';
import { isPrismaNumberType, isPrismaStringType } from '../helpers';
import { PrismaScalarField } from '../interfaces';

import { FieldDeclaration } from '@trxn/hapify-core';

export function convertDmmfPrimaryFieldToHapifyField(
  field: PrismaScalarField,
  metadata?: Record<string, unknown>,
  documentation?: string,
): FieldDeclaration {
  const { name, type } = field;
  if (!isPrismaNumberType(type) && !isPrismaStringType(type)) {
    throw new Error(`Unsupported primary field type: ${type}`);
  }

  const pluralName = getPluralName(field, metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);
  const primaryConstraints = createPrimaryConstraints(field, metadata);

  return {
    type: 'primary',
    name,
    pluralName,
    documentation,
    ...baseConstraints,
    ...primaryConstraints,
    scalar: type === 'String' ? 'string' : 'number',
  };
}
