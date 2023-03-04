/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, ModelDeclaration, Relation } from './models';

/**
 * The schema type
 */
export type Schema = {
  models: Model[];
  relations: Relation[];
};

/**
 * The schema type
 */
export type SchemaDeclaration = {
  models: ModelDeclaration[];
};
