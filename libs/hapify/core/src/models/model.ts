/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasSomeFieldFactory } from './factories';
import {
  BaseField,
  Constraints,
  Field,
  FieldDeclaration,
  FieldType,
  ForeignField,
  IsConstraints,
  PrimaryField,
  VirtualField,
} from '../fields';

/**
 * One-to-many relation
 */
export type OneManyRelation = {
  type: 'oneMany';
  name: string;
  from: {
    model: Model;
    virtual: VirtualField;
  };
  to: {
    model: Model;
    foreign: ForeignField[];
    virtual: VirtualField;
  };
};

/**
 * Many-to-many relation
 */
export type ManyManyRelation = {
  type: 'manyMany';
  name: string;
  from: {
    model: Model;
    virtual: VirtualField;
  };
  to: {
    model: Model;
    virtual: VirtualField;
  };
};

/**
 * One-to-one relation
 */
export type OneOneRelation = {
  type: 'oneOne';
  name: string;
  from: {
    model: Model;
    virtual: VirtualField;
  };
  to: {
    model: Model;
    foreign: IsConstraints<ForeignField, 'isUnique'>[];
    virtual: VirtualField;
  };
};

/**
 * The relation type
 */
export type Relation = OneManyRelation | ManyManyRelation | OneOneRelation;

export interface PrimaryKey {
  name: string | null;
  fields: PrimaryField[];
}

export interface PrimaryKeyDeclaration {
  name: string | null;
  fields: string[];
}

/**
 * The model type
 */
export type Model = {
  name: string;
  pluralName: string;
  fields: Field[];
  primaryKey: PrimaryKey | null;
  documentation?: string;
  metadata?: Record<string, unknown>;
};

export type ModelDeclaration = {
  name: string;
  pluralName?: string;
  fields: FieldDeclaration[];
  primaryKey: PrimaryKeyDeclaration | null;
  documentation?: string;
  metadata?: Record<string, unknown>;
};

export type OwnedModel = {
  own: ModelWithOwnership;
  relation: Relation;
  on?: {
    model: Model;
    field: ForeignField | ForeignField[];
  };
};

export type ModelWithOwnership = Model & {
  ownedModels: OwnedModel[];
};

/**
 * Predicate to check if a model is valid
 */
export type IsModel<M> = M extends Model ? M : never;

/**
 * Get the model that has a primary key
 *
 * @example
 *
 * type A = {
 *   name: 'A';
 *   fields: [{ name: 'a'; type: 'number' }, { name: 'b'; type: 'string' }];
 * };
 *
 * type B = {
 *   name: 'B';
 *   fields: [{ name: 'a'; type: 'boolean' }];
 * };
 *
 * type C = HaveField<A, 'string'>; // c = A
 * type D = HaveField<A, 'number'>; // D = A
 * type E = HaveField<A, 'boolean'>; // E = never
 * type E = HaveField<A | B, 'boolean'>; // E = B
 */
export type HaveField<
  M extends Model,
  T extends string = FieldType,
> = M extends Model
  ? M['fields'] extends Array<infer F>
    ? F extends BaseField<string, Constraints<KeyType, any>>
      ? F['type'] extends T
        ? M & {
            fields: Array<M['fields'] | BaseField<T>>;
          }
        : never
      : never
    : never
  : never;

export type HaveBooleanField<M extends Model> = HaveField<M, 'boolean'>;
export type HaveDateField<M extends Model> = HaveField<M, 'date'>;
export type HaveEnumField<M extends Model> = HaveField<M, 'enum'>;
export type HaveFileField<M extends Model> = HaveField<M, 'file'>;
export type HaveForeignField<M extends Model> = HaveField<M, 'foreign'>;
export type HaveNumberField<M extends Model> = HaveField<M, 'number'>;
export type HaveObjectField<M extends Model> = HaveField<M, 'object'>;
export type HavePrimaryField<M extends Model> = HaveField<M, 'primary'>;
export type HaveStringField<M extends Model> = HaveField<M, 'string'>;
export type HaveVirtualField<M extends Model> = HaveField<M, 'virtual'>;

/**
 * Get the field type of model
 *
 * @example
 *
 * type A = {
 *   name: 'A';
 *   fields: [{ name: 'a'; type: 'number' }, { name: 'b'; type: 'string' }];
 * };
 *
 * type B = {
 *   name: 'B';
 *   fields: [{ name: 'a'; type: 'boolean' }];
 * };
 *
 * type C = GetFieldTypes<A>; // C = 'number' | 'string'
 * type D = GetFieldTypes<B>; // D = 'boolean'
 * type E = GetFieldTypes<A | B>; // E = 'number' | 'string' | 'boolean'
 */
export type GetFieldTypes<M extends Model> = M['fields'] extends Array<infer F>
  ? F extends Field
    ? F['type']
    : never
  : never;

/**
 * Get the field type of model
 */
export const hasSomeBooleanField = hasSomeFieldFactory('boolean');
export const hasSomeDateField = hasSomeFieldFactory('date');
export const hasSomeEnumField = hasSomeFieldFactory('enum');
export const hasSomeFileField = hasSomeFieldFactory('file');
export const hasSomeForeignField = hasSomeFieldFactory('foreign');
export const hasSomeNumberField = hasSomeFieldFactory('number');
export const hasSomeObjectField = hasSomeFieldFactory('object');
export const hasSomePrimaryField = hasSomeFieldFactory('primary');
export const hasSomeStringField = hasSomeFieldFactory('string');
export const hasSomeVirtualField = hasSomeFieldFactory('virtual');
