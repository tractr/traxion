import type { DMMF } from '@prisma/generator-helper';

import { convertDmmfEnumFieldToHapifyField } from './convert-dmmf-enum-field-to-hapify-field';
import { convertDmmfObjectFieldToHapifyField } from './convert-dmmf-object-field-to-hapify-field';
import { convertDmmfPrimaryFieldToHapifyField } from './convert-dmmf-primary-field-to-hapify-field';
import { convertDmmfScalarFieldToHapifyField } from './convert-dmmf-scalar-field-to-hapify-field';
import { extractMetadataFromDocumentation } from '../extract-metadata-from-documentation';
import {
  PrismaEnumField,
  PrismaObjectField,
  PrismaScalarField,
} from '../interfaces';
import { validations } from '../validations';

import { EnumType, FieldDeclaration } from '@trxn/hapify-core';

/**
 * Convert a DMMF field to a Hapify field.
 *
 * @param field
 * @returns
 */
export function convertDmmfFieldToHapifyField(
  model: DMMF.Model,
  field: DMMF.Field,
  enums: EnumType[],
): FieldDeclaration | FieldDeclaration[] {
  const { metadata, documentation } = extractMetadataFromDocumentation(
    field.documentation,
    validations,
  );

  // Handle primary fields as they are mapped to a dedicated field type in hapify
  if (field.isId) {
    return convertDmmfPrimaryFieldToHapifyField(
      field as PrismaScalarField,
      metadata,
      documentation,
    );
  }

  // Handle fields depending on their kind
  switch (field.kind) {
    case 'scalar':
      return convertDmmfScalarFieldToHapifyField(field as PrismaScalarField);
    case 'enum':
      return convertDmmfEnumFieldToHapifyField(field as PrismaEnumField, enums);
    case 'object':
      return convertDmmfObjectFieldToHapifyField(
        model,
        field as PrismaObjectField,
        metadata,
        documentation,
      );
    case 'unsupported':
      throw new Error(`Unsupported field kind`);
    default:
      throw new Error(`Unknown kind ${field.kind as string}`);
  }
}
