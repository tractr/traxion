import type { DMMF } from '@prisma/generator-helper';

import { convertDmmfEnumFieldToHapifyField } from './convert-dmmf-enum-field-to-hapify-field';
import { convertDmmfObjectFieldToHapifyField } from './convert-dmmf-object-field-to-hapify-field';
import { convertDmmfPrimaryFieldToHapifyField } from './convert-dmmf-primary-field-to-hapify-field';
import { convertDmmfScalarFieldToHapifyField } from './convert-dmmf-scalar-field-to-hapify-field';
import { encryptedMetadata, hiddenMetadata } from './metadata-transformer';
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

  // Manage metadata and transform the field if needed

  // Handle primary fields as they are mapped to a dedicated field type in hapify
  if (field.isId) {
    return convertDmmfPrimaryFieldToHapifyField(
      field as PrismaScalarField,
      metadata,
      documentation,
    );
  }

  let fieldDeclaration: FieldDeclaration;

  // Handle fields depending on their kind
  switch (field.kind) {
    case 'scalar':
      fieldDeclaration = convertDmmfScalarFieldToHapifyField(
        field as PrismaScalarField,
      );
      break;
    case 'enum':
      fieldDeclaration = convertDmmfEnumFieldToHapifyField(
        field as PrismaEnumField,
        enums,
      );
      break;
    case 'object':
      fieldDeclaration = convertDmmfObjectFieldToHapifyField(
        model,
        field as PrismaObjectField,
        metadata,
        documentation,
      );
      break;
    case 'unsupported':
      throw new Error(`Unsupported field kind`);
    default:
      throw new Error(`Unknown kind ${field.kind as string}`);
  }

  fieldDeclaration = {
    ...fieldDeclaration,
    documentation,
    metadata: metadata || {},
  };

  // Manage known metadata
  if (metadata) {
    fieldDeclaration = hiddenMetadata(fieldDeclaration);
    fieldDeclaration = encryptedMetadata(fieldDeclaration);
  }

  return fieldDeclaration;
}
