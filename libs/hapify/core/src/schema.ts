/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseField,
  Constraints,
  Field,
  foreignField,
  ForeignKeyField,
  GetType,
  IsConstraints,
  isField,
  isPrimary,
  StringField,
  virtualField,
  VirtualField,
} from './field';

/**
 * One to many relation
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
    foreign: ForeignKeyField;
    virtual: VirtualField;
  };
};

/**
 * Many to many relation
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
 * One to one relation
 */
export type OneOneRelation = {
  type: 'manyMany';
  name: string;
  from: {
    model: Model;
    virtual: VirtualField;
  };
  to: {
    model: Model;
    foreign: IsConstraints<ForeignKeyField, 'isUnique'>;
    virtual: VirtualField;
  };
};

/**
 * The relation type
 */
export type Relation = OneManyRelation | ManyManyRelation | OneOneRelation;

/**
 * The schema type
 */
export type Schema = {
  models: Model[];
  relations: Relation[];
};

/**
 * The model type
 */
export type Model = {
  name: string;
  fields: Field[];
};

/**
 * Predicate to check if a model is valid
 */
export type IsModel<M> = M extends Model ? M : never;

/**
 * Check if a model is valid
 * @param model
 * @returns
 */
export function isModel<M>(model: M): model is IsModel<M> {
  return (
    typeof model === 'object' &&
    model !== null &&
    'name' in model &&
    typeof model.name === 'string' &&
    'fields' in model &&
    Array.isArray(model.fields) &&
    model.fields.every(isField) &&
    'primary' in model &&
    Array.isArray(model.primary) &&
    model.primary.every(isPrimary)
  );
}

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
  T extends string = GetType<Field>,
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

export type HavePrimaryKey<M extends Model> = HaveField<M, 'primary'>;
export type HaveForeignKey<M extends Model> = HaveField<M, 'foreign'>;
export type HaveVirtualField<M extends Model> = HaveField<M, 'virtual'>;
export type HaveStringField<M extends Model> = HaveField<M, 'string'>;
export type HaveNumberField<M extends Model> = HaveField<M, 'number'>;
export type HaveBooleanField<M extends Model> = HaveField<M, 'boolean'>;

/**
 * Get the field type of a model
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
 * Predicate to check if a model has at least one field of a given type
 * @param model
 * @param type
 * @returns
 *
 * @example
 *
 * const a = {
 *   name: 'A',
 *   fields: [
 *     { name: 'a', type: 'number' },
 *     { name: 'b', type: 'string' },
 *   ],
 * };
 *
 * const b = {
 *   name: 'B',
 *   fields: [{ name: 'a', type: 'boolean' }],
 * };
 *
 * hasSomeField(a, 'string'); // true
 * hasSomeField(a, 'boolean'); // false
 * hasSomeField(b, 'boolean'); // true
 */
export function hasSomeField<M extends Model, T extends string>(
  model: M,
  type: T,
): boolean {
  if (typeof type !== 'string') return false;
  return isModel(model) && model.fields.some((f) => f.type === type);
}

/**
 * Factory to create a predicate to check if a model has at least one field of a given type
 * @param type
 * @returns
 *
 * @example
 *
 * const hasSomePrimaryKey = hasSomeFieldFactory('primaryKey');
 * const hasSomeForeignKey = hasSomeFieldFactory('foreignKey');
 */
export function hasSomeFieldFactory<T extends string = GetType<Field>>(
  type: T,
) {
  return <M>(model: M): model is HaveField<IsModel<M>, T> =>
    isModel(model) && hasSomeField(model, type);
}
type test = Extract<Field, StringField>;
export const hasSomePrimaryKey = hasSomeFieldFactory('primaryKey');
export const hasSomeForeignKey = hasSomeFieldFactory('foreignKey');
export const hasSomeVirtualField = hasSomeFieldFactory('virtual');
export const hasSomeStringField = hasSomeFieldFactory('string');
export const hasSomeNumberField = hasSomeFieldFactory('number');
export const hasSomeBooleanField = hasSomeFieldFactory('boolean');

export function createOneManyRelation(
  name: string,
  from: { model: Model; virtual: VirtualField | string },
  to: {
    model: Model;
    foreign: ForeignKeyField | string;
    virtual: VirtualField | string;
  },
) {
  const fromVirtualField =
    typeof from.virtual === 'string'
      ? virtualField(from.virtual)
      : from.virtual;

  const toVirtualField: VirtualField =
    typeof to.virtual === 'string' ? virtualField(to.virtual) : to.virtual;

  const toForeignKeyField: ForeignKeyField =
    typeof to.foreign === 'string' ? foreignField(to.foreign) : to.foreign;

  const relation: OneManyRelation = {
    type: 'oneMany',
    name,
    from: {
      model: from.model,
      virtual: fromVirtualField,
    },
    to: {
      model: to.model,
      foreign: toForeignKeyField,
      virtual: toVirtualField,
    },
  };

  fromVirtualField.relation = relation;
  from.model.fields.push(fromVirtualField);

  toForeignKeyField.relation = relation;
  toVirtualField.relation = relation;

  to.model.fields.push(toForeignKeyField);
  to.model.fields.push(toForeignKeyField);
  to.model.fields.push(toVirtualField);

  return relation;
}
