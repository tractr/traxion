/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DeepRequired } from 'ts-essentials';
import { Boolean, F } from 'ts-toolbelt';

/**
 * Base field properties
 */
export type BaseFieldProperties = {
  type: string;
  name: string;
  metadata?: Record<string, string>;
  notes?: string;
};

/**
 * Constraints
 */
export type Constraint<Key extends string, Type> = {
  constraints: { [key in Key]: Type };
};

export type OptionalConstraint<Key extends string, Type> = {
  constraints?: { [key in Key]?: Type };
};

export type ConstraintsProperty<Key extends string, Type> =
  | Constraint<Key, Type>
  | OptionalConstraint<Key, Type>;

export type EmptyConstraints = {
  constraints?: {};
};

/**
 * Field constraints
 */
export type LabelConstraint = Constraint<'label', boolean>;
export type UniqueConstraint = OptionalConstraint<'unique', boolean>;
export type NotNullConstraint = OptionalConstraint<'notNull', boolean>;
export type MultipleConstraint = OptionalConstraint<'multiple', boolean>;
export type SearchableConstraint = OptionalConstraint<'searchable', boolean>;
export type SortableConstraint = OptionalConstraint<'sortable', boolean>;
export type MinLengthConstraint = OptionalConstraint<'minLength', number>;
export type MaxLengthConstraint = OptionalConstraint<'maxLength', number>;
export type MinConstraint = OptionalConstraint<'min', number>;
export type MaxConstraint = OptionalConstraint<'max', number>;
export type IntegerConstraint = OptionalConstraint<'integer', boolean>;
export type DefaultConstraint = OptionalConstraint<'defaultValue', any>;

export type BaseConstraint =
  | LabelConstraint
  | UniqueConstraint
  | NotNullConstraint
  | DefaultConstraint
  | MultipleConstraint;

export type Constraints =
  | LabelConstraint
  | UniqueConstraint
  | NotNullConstraint
  | MultipleConstraint
  | SearchableConstraint
  | SortableConstraint
  | MinLengthConstraint
  | MaxLengthConstraint
  | MinConstraint
  | MaxConstraint
  | IntegerConstraint
  | DefaultConstraint;

/**
 * Field types
 */
export type BaseFieldType<T extends string> = BaseFieldProperties &
  BaseConstraint & {
    type: T;
  };

export type StringField = BaseFieldType<'string'> &
  SearchableConstraint &
  SortableConstraint &
  MinLengthConstraint &
  MaxLengthConstraint;

export type NumberField = BaseFieldType<'number'> &
  SearchableConstraint &
  SortableConstraint &
  IntegerConstraint &
  MinConstraint &
  MaxConstraint;

export type BooleanField = BaseFieldType<'boolean'> &
  SearchableConstraint &
  SortableConstraint;

export type Field = StringField | NumberField | BooleanField;

/**
 * Check if Field has constraints
 */
export type HasConstraint<
  F extends Field & EmptyConstraints,
  C extends Constraint<string, any>,
> = C extends ConstraintsProperty<infer K, infer T>
  ? F extends ConstraintsProperty<K, T>
    ? 1
    : 0
  : 0 | 1;

export type HasOptionalConstraint<
  F extends Field & EmptyConstraints,
  C extends OptionalConstraint<string, any>,
> = C extends OptionalConstraint<infer K, infer T>
  ? DeepRequired<F> extends Field & Constraint<K, T>
    ? 1
    : 0
  : 0 | 1;

export type HasConstraints<
  F extends Field & EmptyConstraints,
  C extends Constraints,
> = Boolean.Or<
  C extends Constraint<string, any> ? HasConstraint<F, C> : 0,
  HasOptionalConstraint<F, C>
>;

/**
 * Extract types by constraint
 */
export type ExtractConstraint<
  F extends Field,
  C extends Constraints,
> = F extends C ? F : never;

/**
 * Extract generic types by constraint
 */
export type LabelSettable<F extends Field> = ExtractConstraint<
  F,
  LabelConstraint
>;
export type UniqueSettable<F extends Field> = ExtractConstraint<
  F,
  UniqueConstraint
>;
export type NotNullSettable<F extends Field> = ExtractConstraint<
  F,
  NotNullConstraint
>;
export type MultipleSettable<F extends Field> = ExtractConstraint<
  F,
  MultipleConstraint
>;
export type Searchable<F extends Field> = ExtractConstraint<
  F,
  SearchableConstraint
>;
export type Sortable<F extends Field> = ExtractConstraint<
  F,
  SortableConstraint
>;
export type MinLengthSettable<F extends Field> = ExtractConstraint<
  F,
  MinLengthConstraint
>;
export type MaxLengthSettable<F extends Field> = ExtractConstraint<
  F,
  MaxLengthConstraint
>;
export type MinSettable<F extends Field> = ExtractConstraint<F, MinConstraint>;
export type MaxSettable<F extends Field> = ExtractConstraint<F, MaxConstraint>;
export type IntegerSettable<F extends Field> = ExtractConstraint<
  F,
  IntegerConstraint
>;
export type DefaultSettable<F extends Field> = ExtractConstraint<
  F,
  DefaultConstraint
>;

/**
 * Extract generic types from Field union type by constraint
 */
export type LabelSettableField = LabelSettable<Field>;
export type UniqueSettableField = UniqueSettable<Field>;
export type NotNullSettableField = NotNullSettable<Field>;
export type MultipleSettableField = MultipleSettable<Field>;
export type SearchableField = Searchable<Field>;
export type SortableField = Sortable<Field>;
export type MinLengthSettableField = MinLengthSettable<Field>;
export type MaxLengthSettableField = MaxLengthSettable<Field>;
export type MinSettableField = MinSettable<Field>;
export type MaxSettableField = MaxSettable<Field>;
export type IntegerSettableField = IntegerSettable<Field>;
export type DefaultSettableField = DefaultSettable<Field>;

/**
 * Extract generic types and constraint names from Field union type
 */
export type FieldTypes<F extends Field> = F extends { type: infer N }
  ? N
  : never;

export type ConstraintNames<F extends Field> = F extends {
  constraints?: { [key in infer N]?: any };
}
  ? N
  : never;

/**
 * Extract generic types and constraint names from Field union type by constraint
 */
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type HasConstraintsProperty<F extends Field> = WithRequired<
  F,
  'constraints'
>;

export function hasConstraintsKey<F extends Field>(
  field: F,
): field is HasConstraintsProperty<F> {
  return 'constraints' in field && !!field.constraints;
}

export function hasConstraint<
  N extends ConstraintNames<Field>,
  C extends { constraints?: { [key in N]?: any } },
  F extends Field,
>(
  constraintName: N,
): (
  field: Field,
) => field is HasConstraintsProperty<
  F & C extends ConstraintsProperty<N, any> ? F & C : never
> {
  return (
    field: Field,
  ): field is HasConstraintsProperty<
    F & C extends ConstraintsProperty<N, any> ? F & C : never
  > => hasConstraintsKey(field) && !!field.constraints[constraintName];
}

/**
 * Make a predicate to filter out fields by constraint
 */
export const isString = (field: Field): field is StringField =>
  field.type === 'string';
export const isNumber = (field: Field): field is NumberField =>
  field.type === 'number';
export const isBoolean = (field: Field): field is NumberField =>
  field.type === 'boolean';

export const hasLabel = hasConstraint('label');
export const isUnique = hasConstraint('unique');
export const isNotNull = hasConstraint('notNull');
export const isSearchable = hasConstraint('searchable');
export const isMultiple = hasConstraint('multiple');
export const isSortable = hasConstraint('sortable');
export const hasMinLength = hasConstraint('minLength');
export const hasMaxLength = hasConstraint('maxLength');
export const hasMin = hasConstraint('min');
export const hasMax = hasConstraint('max');
export const isInteger = hasConstraint('integer');
export const hasDefault = hasConstraint('defaultValue');

export type FieldOptions<T extends Field> = Omit<
  T,
  'name' | 'type' | 'constraints'
>;
export type EmptyConstraintsOptions<F extends Field> = F['constraints'];

export const fieldFactory =
  <T extends FieldTypes<Field>, F extends Field & { type: T }>(
    type: T,
    defaultConstraints?: EmptyConstraintsOptions<F>,
    defaultOptions: Partial<FieldOptions<F>> = {},
  ) =>
  (
    name: string,
    constraints?: EmptyConstraintsOptions<F>,
    options: Partial<FieldOptions<F>> = {},
  ) => ({
    type,
    name,
    constraints: {
      ...defaultConstraints,
      ...constraints,
    },
    ...defaultOptions,
    ...options,
  });

export const stringFieldFactory = fieldFactory('string');
export const numberFieldFactory = fieldFactory('number');
export const booleanFieldFactory = fieldFactory('boolean');
