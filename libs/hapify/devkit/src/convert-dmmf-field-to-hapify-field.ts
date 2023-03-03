import type { DMMF } from '@prisma/generator-helper';

import { convertDmmfEnumFieldToHapifyField } from './convert-dmmf-enum-field-to-hapify-field';
import { convertDmmfObjectFieldToHapifyField } from './convert-dmmf-object-field-to-hapify-field';
import { convertDmmfPrimaryFieldToHapifyField } from './convert-dmmf-primary-field-to-hapify-field';
import { convertDmmfScalarFieldToHapifyField } from './convert-dmmf-scalar-field-to-hapify-field';
import {
  PrismaEnumField,
  PrismaObjectField,
  PrismaScalarField,
} from './interfaces';

import { EnumType, Field } from '@trxn/hapify-core';

/**
 * Convert a DMMF field to a Hapify field.
 *
 * @param field
 * @returns
 */
export function convertDmmfFieldToHapifyField(
  field: DMMF.Field,
  enums: EnumType[],
): Field {
  // Handle primary fields as they are mapped to a dedicated field type in hapify
  if (field.isId) {
    return convertDmmfPrimaryFieldToHapifyField(field as PrismaScalarField);
  }

  // Handle fields depending on their kind
  switch (field.kind) {
    case 'scalar':
      return convertDmmfScalarFieldToHapifyField(field as PrismaScalarField);
    case 'enum':
      return convertDmmfEnumFieldToHapifyField(field as PrismaEnumField, enums);
    case 'object':
      return convertDmmfObjectFieldToHapifyField(field as PrismaObjectField);
    case 'unsupported':
      throw new Error(`Unsupported field kind`);
    default:
      throw new Error(`Unknown kind ${field.kind as string}`);
  }
}
