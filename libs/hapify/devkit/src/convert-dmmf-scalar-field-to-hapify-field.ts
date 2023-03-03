import {
  createBooleanConstraints,
  createDateConstraints,
  createDefaultConstraints,
  createFileConstraints,
  createNumberConstraints,
  createObjectConstraints,
  createStringConstraints,
  getPluralName,
} from './constraints';
import { extractMetadataFromDocumentation } from './extract-metadata-from-documentation';
import { PrismaScalarField } from './interfaces';
import { validations } from './validations';

import {
  createBooleanField,
  createDateField,
  createFileField,
  createNumberField,
  createObjectField,
  createStringField,
  Field,
} from '@trxn/hapify-core';

/**
 * Convert a DMMF scalar field to a Hapify field.
 *
 * @param field - DMMF scalar field to convert
 * @returns Hapify field
 */
export function convertDmmfScalarFieldToHapifyField(
  field: PrismaScalarField,
): Field {
  const { metadata, documentation } = extractMetadataFromDocumentation(
    field.documentation,
    validations,
  );
  const pluralName = getPluralName(metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);

  // Handle fields depending on their type
  const { type } = field;
  switch (type) {
    case 'Decimal':
    case 'Float':
    case 'Int':
    case 'BigInt':
      return createNumberField(
        field.name,
        {
          ...baseConstraints,
          ...createNumberConstraints(field, metadata),
        },
        { pluralName },
      );

    case 'String':
      return createStringField(
        field.name,
        {
          ...baseConstraints,
          ...createStringConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'Boolean':
      return createBooleanField(
        field.name,
        {
          ...baseConstraints,
          ...createBooleanConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'DateTime':
      return createDateField(
        field.name,
        {
          ...baseConstraints,
          ...createDateConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'Bytes':
      return createFileField(
        field.name,
        {
          ...baseConstraints,
          ...createFileConstraints(field, metadata),
        },
        { pluralName },
      );
    case 'JSON':
      return createObjectField(
        field.name,
        {
          ...baseConstraints,
          ...createObjectConstraints(field, metadata),
        },
        { pluralName },
      );
    default:
      throw new Error(`Unknown field type ${type as string}`);
  }
}
