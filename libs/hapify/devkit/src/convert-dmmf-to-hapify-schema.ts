import type { DMMF } from '@prisma/generator-helper';

import { convertDmmfEnumToHapifyEnum } from './convert-dmmf-enum-to-hapify-enum';
import { convertDmmfModelToHapifyModel } from './convert-dmmf-model-to-hapify-model';

import { ModelDeclaration, SchemaDeclaration } from '@trxn/hapify-core';

/**
 * Convert a DMMF Datamodel to a Hapify schema.
 * @param dataModel
 * @returns
 */
export function convertDmmfToHapifySchemaDeclaration(
  dmmf: DMMF.Document,
): SchemaDeclaration {
  // First: create all enums
  // this is required, as enums are a dependency to create enum fields in models
  const enums = dmmf.datamodel.enums.map(convertDmmfEnumToHapifyEnum);

  // Second: create all models with their fields
  const models: ModelDeclaration[] = dmmf.datamodel.models.map((model) =>
    convertDmmfModelToHapifyModel(model, enums),
  );

  // Third: from models, create relations
  // Create a function using createOneToOneRelation and createOneToManyRelation

  // Fourth: return the schema
  return { models, enums };
}
