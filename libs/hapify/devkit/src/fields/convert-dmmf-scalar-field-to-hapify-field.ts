import { convertDmmfForeignKeyToHapifyField } from './convert-dmmf-foreign-key-to-hapify-field';
import {
  createBooleanConstraints,
  createDateConstraints,
  createDefaultConstraints,
  createFileConstraints,
  createNumberConstraints,
  createObjectConstraints,
  createStringConstraints,
  getPluralName,
} from '../constraints';
import { extractMetadataFromDocumentation } from '../extract-metadata-from-documentation';
import { PrismaScalarField } from '../interfaces';
import { validations } from '../validations';

import {
  createBooleanField,
  createDateField,
  createFileField,
  createNumberField,
  createObjectField,
  createStringField,
  FieldDeclaration,
} from '@trxn/hapify-core';

/**
 * Convert a DMMF scalar field to a Hapify field.
 *
 * @param field - DMMF scalar field to convert
 * @returns Hapify field
 */
export function convertDmmfScalarFieldToHapifyField(
  field: PrismaScalarField,
): FieldDeclaration {
  const { metadata, documentation } = extractMetadataFromDocumentation(
    field.documentation,
    validations,
  );
  const pluralName = getPluralName(field, metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);

  // Handle fields depending on their type
  const { type, isReadOnly } = field;

  // Prisma identify the foreign key as a read only field
  if (isReadOnly) {
    return convertDmmfForeignKeyToHapifyField(field, metadata, documentation);
  }

  switch (type) {
    case 'Decimal':
    case 'Float':
    case 'Int':
    case 'BigInt':
      return createNumberField(
        field.name,
        {
          documentation,
          ...baseConstraints,
          ...createNumberConstraints(field, metadata),
        },
        { pluralName },
      );

    case 'String':
      return createStringField(
        field.name,
        {
          documentation,
          ...baseConstraints,
          ...createStringConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'Boolean':
      return createBooleanField(
        field.name,
        {
          documentation,
          ...baseConstraints,
          ...createBooleanConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'DateTime':
      return createDateField(
        field.name,
        {
          documentation,
          ...baseConstraints,
          ...createDateConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'Bytes':
      return createFileField(
        field.name,
        {
          documentation,
          ...baseConstraints,
          ...createFileConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'Json':
      return createObjectField(
        field.name,
        {
          documentation,
          ...baseConstraints,
          ...createObjectConstraints(field, metadata),
        },
        { pluralName },
      );
    default:
      throw new Error(`Unknown field type ${type as string}`);
  }
}
