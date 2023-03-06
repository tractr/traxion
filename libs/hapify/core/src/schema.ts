/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnumType } from './fields';
import { Model, ModelDeclaration, Relation } from './models';

/**
 * The schema type
 */
export type Schema = {
  enums: EnumType[];
  models: Model[];
  relations: Relation[];
};

/**
 * The schema type
 */
export type SchemaDeclaration = {
  enums: EnumType[];
  models: ModelDeclaration[];
};
