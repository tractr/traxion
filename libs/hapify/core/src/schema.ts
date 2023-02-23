/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnumType } from './fields';
import { Model, Relation } from './models';

/**
 * The schema type
 */
export type Schema = {
  models: Model[];
  relations: Relation[];
  enums: EnumType[];
};
