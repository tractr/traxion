/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

/**
 * Base field properties
 */
export type BaseFieldProperties = {
  type: string;
  name: string;
  metadata?: Record<string, string>;
  notes?: string;
};

export type KeyType = string | number | symbol;

/**
 * Constraints
 */
export type Constraint<Key extends KeyType, Type> = {
  [key in Key]: Type;
};

export type OptionalConstraint<Key extends KeyType, Type> = {
  [key in Key]?: Type;
};

export type Constraints<Key extends KeyType, Type> =
  | Constraint<Key, Type>
  | OptionalConstraint<Key, Type>;

export type EmptyConstraints = {};

/**
 * Field constraints
 */
export type LabelConstraint = OptionalConstraint<'isLabel', boolean>;
export type UniqueConstraint = OptionalConstraint<'isUnique', boolean>;
export type NullConstraint = OptionalConstraint<'isNull', boolean>;
export type MultipleConstraint = OptionalConstraint<'isMultiple', boolean>;
export type SearchableConstraint = OptionalConstraint<'isSearchable', boolean>;
export type SortableConstraint = OptionalConstraint<'isSortable', boolean>;
export type MinLengthConstraint = OptionalConstraint<'minLength', number>;
export type MaxLengthConstraint = OptionalConstraint<'maxLength', number>;
export type MinConstraint = OptionalConstraint<'min', number>;
export type MaxConstraint = OptionalConstraint<'max', number>;
export type IntegerConstraint = OptionalConstraint<'isInteger', boolean>;
export type DefaultConstraint = OptionalConstraint<'defaultValue', any>;

export type BaseConstraint = LabelConstraint &
  UniqueConstraint &
  NullConstraint &
  DefaultConstraint &
  MultipleConstraint;

// export type Constraints =
//   | LabelConstraint
//   | UniqueConstraint
//   | NullConstraint
//   | MultipleConstraint
//   | SearchableConstraint
//   | SortableConstraint
//   | MinLengthConstraint
//   | MaxLengthConstraint
//   | MinConstraint
//   | MaxConstraint
//   | IntegerConstraint
//   | DefaultConstraint;

/**
 * Get the constraints key type in function of the constraints union type
 */
export type BaseFieldType<T extends string> = BaseFieldProperties & {
  type: T;
};

export type BaseField<
  T extends string,
  C extends Constraints<KeyType, any>,
> = BaseFieldType<T> & C;

export type IsField<F> = F extends BaseField<string, Constraints<KeyType, any>>
  ? F
  : never;

export type StringField = BaseField<
  'string',
  BaseConstraint &
    SearchableConstraint &
    SortableConstraint &
    MinLengthConstraint &
    MaxLengthConstraint
>;

export type NumberField = BaseField<
  'number',
  BaseConstraint &
    SearchableConstraint &
    SortableConstraint &
    IntegerConstraint &
    MinConstraint &
    MaxConstraint
>;

export type BooleanField = BaseField<
  'boolean',
  BaseConstraint & SearchableConstraint & SortableConstraint
>;

export type Field = StringField | NumberField | BooleanField;

/**
 * Extract types by constraint
 */
export type GetConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = F extends BaseField<string, infer C> ? C : never;

export type FieldWithContraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  C extends Constraints<KeyType, any>,
> = F extends BaseField<string, Constraints<infer K, infer T>>
  ? C extends Constraints<K, T>
    ? F
    : never
  : never;

/**
 * Extract generic types by constraint
 */
export type LabelSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, LabelConstraint>;
export type UniqueSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, UniqueConstraint>;
export type NullSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, NullConstraint>;
export type MultipleSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, MultipleConstraint>;
export type Searchable<F extends BaseField<string, Constraints<KeyType, any>>> =
  FieldWithContraints<F, SearchableConstraint>;
export type Sortable<F extends BaseField<string, Constraints<KeyType, any>>> =
  FieldWithContraints<F, SortableConstraint>;
export type MinLengthSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, MinLengthConstraint>;
export type MaxLengthSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, MaxLengthConstraint>;
export type MinSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, MinConstraint>;
export type MaxSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, MaxConstraint>;
export type IntegerSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, IntegerConstraint>;
export type DefaultSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = FieldWithContraints<F, DefaultConstraint>;

/**
 * Extract generic types from Field union type by constraint
 */
export type LabelSettableField = LabelSettable<Field>;
export type UniqueSettableField = UniqueSettable<Field>;
export type NullSettableField = NullSettable<Field>;
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
export type FieldTypes<F extends BaseField<string, Constraints<KeyType, any>>> =
  F extends { type: infer N } ? N : never;

export type ConstraintNames<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = F extends BaseField<string, infer C> ? keyof C : never;

/**
 * Extract generic types and constraint names from Field union type by constraint
 */
export type HasConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  N extends ConstraintNames<F>,
> = F & {
  [K in N]-?: Exclude<F[K], undefined>;
};
export type IsConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  N extends ConstraintNames<F>,
> = F & {
  [K in N]-?: Exclude<F[K], undefined> extends boolean
    ? true
    : Exclude<F[K], undefined>;
};

export function isField<F>(
  field: F,
): field is F extends BaseField<string, Constraints<KeyType, any>> ? F : never {
  return (
    typeof field === 'object' &&
    field !== null &&
    'type' in field &&
    'name' in field
  );
}

export function hasConstraint<F, N extends ConstraintNames<IsField<F>>>(
  field: F,
  constraintName: N,
): field is HasConstraints<IsField<F>, N> {
  return isField(field) && constraintName in field;
}

export function hasConstraintFactory<
  N extends ConstraintNames<
    BaseField<string, Constraints<KeyType, any>>
  > = ConstraintNames<Field>,
>(constraintName: N) {
  return <F>(
    field: F,
  ): field is F extends BaseField<string, Constraints<infer K, any>>
    ? N extends ConstraintNames<F>
      ? HasConstraints<F, N>
      : never
    : never => isField(field) && constraintName in field;
}

export function isConstraintFactory<
  N extends ConstraintNames<
    BaseField<string, Constraints<KeyType, any>>
  > = ConstraintNames<Field>,
>(constraintName: N) {
  return <F>(
    field: F,
  ): field is F extends BaseField<string, Constraints<infer K, any>>
    ? N extends ConstraintNames<F>
      ? IsConstraints<F, N>
      : never
    : never =>
    isField(field) &&
    constraintName in field &&
    typeof field[constraintName] === 'boolean' &&
    field[constraintName];
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

export const hasLabel = hasConstraintFactory('label');
export const hasUnique = hasConstraintFactory('isUnique');
export const hasNull = hasConstraintFactory('isNull');
export const hasSearchable = hasConstraintFactory('isSearchable');
export const hasMultiple = hasConstraintFactory('isMultiple');
export const hasSortable = hasConstraintFactory('isSortable');
export const hasMinLength = hasConstraintFactory('minLength');
export const hasMaxLength = hasConstraintFactory('maxLength');
export const hasMin = hasConstraintFactory('min');
export const hasMax = hasConstraintFactory('max');
export const hasInteger = hasConstraintFactory('isInteger');
export const hasDefault = hasConstraintFactory('defaultValue');

export const isUnique = isConstraintFactory('isUnique');
export const isNull = isConstraintFactory('isNull');
export const isSearchable = isConstraintFactory('isSearchable');
export const isMultiple = isConstraintFactory('isMultiple');
export const isSortable = isConstraintFactory('isSortable');
export const isInteger = isConstraintFactory('isInteger');

export type FieldOptions<
  T extends BaseField<string, Constraints<KeyType, any>>,
> = Omit<T, 'name' | 'type' | 'constraints'>;
export type EmptyConstraintsOptions<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = F['constraints'];

export const fieldFactory =
  <
    T extends FieldTypes<Field>,
    F extends BaseField<string, Constraints<KeyType, any>> & {
      type: T;
    },
  >(
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
