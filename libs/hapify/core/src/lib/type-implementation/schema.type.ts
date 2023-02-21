import {
  BaseField,
  BooleanField,
  Constraints,
  Field,
  foreignField,
  ForeignKeyField,
  GetType,
  IsConstraints,
  isField,
  isPrimary,
  NumberField,
  PrimaryKeyField,
  StringField,
  virtualField,
  VirtualField,
} from './field.type';

/**
 * Traxion models
 */

export type Schema = {
  models: Model[];
  relations: Relation[];
};

export type Relation = OneManyRelation | ManyManyRelation | OneOneRelation;

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
 * The model type
 */
export type Model = {
  name: string;
  fields: Field[];
  primary: PrimaryKeyField[];
};

export type IsModel<M> = M extends Model ? M : never;

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
 * @param M
 * @returns
 *
 * @example
 *
 *
 */
export type HaveField<
  M extends Model,
  F extends BaseField<string, Constraints<KeyType, any>>,
> = M extends Model
  ? M['fields'] extends unknown[]
    ? Omit<M, 'fields'> & { fields: [...M['fields'], F] }
    : never
  : never;

export type HavePrimaryKey<M extends Model> = HaveField<M, PrimaryKeyField>;
export type HaveForeignKey<M extends Model> = HaveField<M, ForeignKeyField>;
export type HaveVirtualField<M extends Model> = HaveField<M, VirtualField>;
export type HaveStringField<M extends Model> = HaveField<M, StringField>;
export type HaveNumberField<M extends Model> = HaveField<M, NumberField>;
export type HaveBooleanField<M extends Model> = HaveField<M, BooleanField>;

export function hasSomeField<M extends Model, T extends string>(
  model: M,
  type: T,
): boolean {
  if (typeof type !== 'string') return false;
  return isModel(model) && model.fields.some((f) => f.type === type);
}

export function hasSomeFieldFactory<T extends string = GetType<Field>>(
  type: T,
) {
  return <M>(
    model: M,
  ): model is M extends Model ? HaveField<IsModel<M>, T> : never =>
    isModel(model) && hasSomeField(model, type);
}

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
