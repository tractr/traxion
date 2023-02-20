import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { Field, kebab, Model, pascal } from '@trxn/hapify-core';

/**
 * generate a file path based on the model name, field name and extension
 *
 * @param moduleSpecifier
 * @param imports list of imports
 * @returns ImportDeclarationStructure
 */
export const generateFilePath = (
  modelName: string,
  fieldName: string,
  extension: string,
  path: string
): string => {
  // TODO: change kebab to lower, after traxion casing fix
  const fileName = `${kebab(modelName)}-${kebab(fieldName)}.${extension}`;
  return `${path}/${kebab(modelName)}-${kebab(fieldName)}/${fileName}`;
};
