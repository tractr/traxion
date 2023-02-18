import { Includes } from 'ts-toolbelt/out/List/Includes';

import { BaseFieldType } from './poc-type-v3';

/**
 * A basic set of fields
 */
type NumberField = BaseFieldType<'number'>;
type StringField = BaseFieldType<'string'>;
type PrimaryKeyField = BaseFieldType<'primaryKey'>;
type ForeignKeyField = BaseFieldType<'foreignKey'>;
type VirtualRelationField = BaseFieldType<'virtualRelation'>;
type Field =
  | NumberField
  | StringField
  | PrimaryKeyField
  | ForeignKeyField
  | VirtualRelationField;

/**
 * The model type
 */
type Model = {
  name: string;
  fields: readonly Field[];
};

/**
 * Type predicates that insures a model as a field of the required type
 */
type HasPrimaryField<M extends Model> = Includes<M['fields'], PrimaryKeyField>;
type HasForeignField<M extends Model> = Includes<M['fields'], ForeignKeyField>;
type HasVirtualRelationField<M extends Model> = Includes<
  M['fields'],
  VirtualRelationField
>;

/**
 * Turn a Model union type into an object type with name as props
 */
type UnionToObject<M extends Model> = {
  [k in M['name']]: Extract<M, { name: k }>;
};

/**
 * From an Object of models, extract the one with a ForeignKeyField
 *
 * Note: from what I understand, it is not possible to filter a model union on
 * a field type. So we need to convert the union to an object, filter and
 * turn it back to a union
 */
type ObjectFieldFilter<M extends Record<string, Model>, F extends Field> = {
  [K in keyof M]: {
    0: never;
    1: M[K];
  }[Includes<M[K]['fields'], F>];
};

/**
 * Filter a Model union type by keeping only the models that have at least
 * one field of type F
 */
type UnionFieldFilter<M extends Model, F extends Field> = ObjectFieldFilter<
  UnionToObject<M>,
  F
>[M['name']];

/**
 * Filters derived from the previous generic types
 */
type WithPrimary<M extends Model> = UnionFieldFilter<M, PrimaryKeyField>;
type WithForeignKey<M extends Model> = UnionFieldFilter<M, ForeignKeyField>;
type WithVirtualRelationField<M extends Model> = UnionFieldFilter<
  M,
  VirtualRelationField
>;

/**
 * Extract a model from a Model union type by name
 */
type WithName<M extends Model, N extends M['name']> = Extract<M, { name: N }>;

/**
 * Safe OneManyRelation type
 * it checks that the referer and refered models have the required fields
 */
type OneManyRelation<
  M extends Model,
  RefererM extends WithForeignKey<M>['name'],
  ReferedM extends WithPrimary<M>['name'],
> = {
  type: 'oneMany';
  referer: {
    model: RefererM;
    foreignKeyField: Extract<
      WithName<M, RefererM>['fields'][number],
      ForeignKeyField
    >['name'];
    virtualRelationField: Extract<
      WithName<M, RefererM>['fields'][number],
      VirtualRelationField
    >['name'];
  };
  refered: {
    model: ReferedM;
    primaryField: Extract<
      WithName<M, ReferedM>['fields'][number],
      PrimaryKeyField
    >['name'];
    virtualRelationField: Extract<
      WithName<M, ReferedM>['fields'][number],
      VirtualRelationField
    >['name'];
  };
};

//-------------------------------------------------------------
// Test
//-------------------------------------------------------------
const modelWithForeignKey = {
  name: 'modelWithForeignKey',
  fields: [
    {
      type: 'foreignKey',
      name: 'fk1',
    },
    {
      type: 'virtualRelation',
      name: 'virtualRelation1',
    },
  ] as const,
} as const;

const modelWithPrimaryKey = {
  name: 'modelWithPrimaryKey',
  fields: [
    {
      type: 'primaryKey',
      name: 'id2',
    },
    {
      type: 'virtualRelation',
      name: 'virtualRelation2',
    },
  ] as const,
} as const;

const modelWithBoth = {
  name: 'modelWithBoth',
  fields: [
    {
      type: 'primaryKey',
      name: 'id3',
    },
    {
      type: 'foreignKey',
      name: 'fk3',
    },
    {
      type: 'string',
      name: 'name3',
    },
  ],
} as const;

const modelWithNone = {
  name: 'modelWithNone',
  fields: [
    {
      type: 'string',
      name: 'name4',
    },
  ],
} as const;

const models = [
  modelWithForeignKey,
  modelWithPrimaryKey,
  modelWithBoth,
  modelWithNone,
] as const;

type m = typeof models[number];

/**
 * Extract primary keys from a model
 */
type primaryField = Extract<
  typeof modelWithPrimaryKey['fields'][number],
  PrimaryKeyField
>['name']; // 'id2'

/**
 * Can extract a model by field constraint using type unions
 */
type cantDoIt = m['fields'][number] extends PrimaryKeyField
  ? 'always as long as their is at least one primary field in one model'
  : 'only if their is no primary in the whole models union';

/**
 * Extract models that contains a special field
 */
type modelsWithForeignKey = WithForeignKey<m>['name']; // 'modelWithForeignKey' | 'modelWithBoth'
type modelsWithPrimary = WithPrimary<m>['name']; // 'modelWithPrimaryKey' | 'modelWithBoth'
type modelsWithVirtualRelationField = WithVirtualRelationField<m>['name']; // 'modelWithForeignKey' | 'modelWithPrimaryKey''

/**
 * Relation declaration is type safe =)
 */
const oneManyRelation: OneManyRelation<
  m,
  'modelWithForeignKey',
  'modelWithPrimaryKey'
> = {
  type: 'oneMany',
  referer: {
    model: 'modelWithForeignKey',
    foreignKeyField: 'fk1',
    virtualRelationField: 'virtualRelation1',
  },
  refered: {
    model: 'modelWithPrimaryKey',
    primaryField: 'id2',
    virtualRelationField: 'virtualRelation2',
  },
};
