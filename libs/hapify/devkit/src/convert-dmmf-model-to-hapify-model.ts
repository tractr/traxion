import type { DMMF } from '@prisma/client/runtime';

import { convertDmmfFieldToHapifyField } from './convert-dmmf-field-to-hapify-field';

import { Field, getPrimaryFields, Model } from '@trxn/hapify-core';

/**
 * Convert a DMMF model  object to a Hapify model.
 * @param model The DMMF model to convert.
 * @returns The Hapify model.
 */
export function convertDmmfModelToHapifyModel(model: DMMF.Model): Model {
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
  const fields: Field[] = model.fields.map(convertDmmfFieldToHapifyField);

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
