import { DMMF } from '@prisma/client/runtime';

import { convertToField } from '../fields';

import { Field, Model } from '@trxn/hapify-core';

/**
 * Convert a DMMF model  object to a Hapify model.
 * @param model The DMMF model to convert.
 * @returns The Hapify model.
 */
export function convertToModel(model: DMMF.Model): Model {
  const fields: Field[] = model.fields.map(convertToField);

  return {
    name: model.name,
    fields,
  };
}
