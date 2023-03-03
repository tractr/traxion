import {
  createDefaultConstraints,
  createEnumConstraints,
  getPluralName,
} from './constraints';
import { extractMetadataFromDocumentation } from './extract-metadata-from-documentation';
import { PrismaEnumField } from './interfaces';
import { validations } from './validations';

import { createEnumField, EnumType, Field } from '@trxn/hapify-core';

/**
 * Convert a DMMF enum field to a Hapify field.
 *
 * @param field - DMMF enum field to convert
 * @returns Hapify field
 */
export function convertDmmfEnumFieldToHapifyField(
  field: PrismaEnumField,
  enums: EnumType[],
): Field {
  const enumType = enums.find((e) => e.name === field.type);

  if (!enumType) {
    throw new Error(`Enum ${field.type} not found`);
  }

  const { metadata, documentation } = extractMetadataFromDocumentation(
    field.documentation,
    validations,
  );

  const pluralName = getPluralName(metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);

  return createEnumField(
    field.name,
    {
      ...baseConstraints,
      ...createEnumConstraints(field, metadata),
      enum: enumType,
    },
    {
      pluralName,
    },
  );
}
