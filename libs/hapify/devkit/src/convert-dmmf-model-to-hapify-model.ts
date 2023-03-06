import type { DMMF } from '@prisma/generator-helper';

import { convertDmmfFieldToHapifyField } from './fields';

import {
  EnumType,
  FieldDeclaration,
  getPrimaryFields,
  ModelDeclaration,
} from '@trxn/hapify-core';

/**
 * Convert a DMMF model  object to a Hapify model.
 * @param model The DMMF model to convert.
 * @returns The Hapify model.
 */
export function convertDmmfModelToHapifyModel(
  model: DMMF.Model,
  enums: EnumType[],
): ModelDeclaration {
  const {
    name,
    documentation,
    primaryKey,
    // Got this properties from the DMMF Model object:
    // dbName,
    // fields,
    // uniqueFields,
    // uniqueIndexes,
  } = model;

  const fields: FieldDeclaration[] = model.fields.flatMap((field) =>
    convertDmmfFieldToHapifyField(model, field, enums),
  );

  return {
    name,
    documentation,
    fields,
    primaryKey:
      primaryKey === null
        ? null
        : {
            name: primaryKey.name,
            fields: getPrimaryFields(fields),
          },
  };
}
