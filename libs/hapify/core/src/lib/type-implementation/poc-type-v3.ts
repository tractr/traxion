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

export type ConstraintsProperty<Key extends KeyType, Type> =
  | Constraint<Key, Type>
  | OptionalConstraint<Key, Type>;

export type EmptyConstraints = {
  constraints?: {};
};

/**
 * Field constraints
 */
export type LabelConstraint = OptionalConstraint<'label', boolean>;
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

export type BaseConstraint = LabelConstraint &
  UniqueConstraint &
  NotNullConstraint &
  DefaultConstraint &
  MultipleConstraint;

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
 * Get the constraints key type in function of the constraints union type
 */
export type FieldConstraints<C extends ConstraintsProperty<KeyType, any>> = {
  0: { constraints: C };
  1: { constraints?: C };
}[Partial<C> extends C ? 1 : 0];

export type BaseFieldType<T extends string> = BaseFieldProperties & {
  type: T;
};

export type BaseField<
  T extends string,
  C extends ConstraintsProperty<KeyType, any>,
> = BaseFieldType<T> & FieldConstraints<C>;

export type IsField<F> = F extends BaseField<
  string,
  ConstraintsProperty<KeyType, any>
>
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
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = F extends FieldConstraints<infer C> ? C : never;

export type ExtractConstraint<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
  C extends ConstraintsProperty<KeyType, any>,
> = F extends BaseField<string, ConstraintsProperty<infer K, infer T>>
  ? C extends ConstraintsProperty<K, T>
    ? F
    : never
  : never;

/**
 * Extract generic types by constraint
 */
export type LabelSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, LabelConstraint>;
export type UniqueSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, UniqueConstraint>;
export type NotNullSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, NotNullConstraint>;
export type MultipleSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, MultipleConstraint>;
export type Searchable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, SearchableConstraint>;
export type Sortable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, SortableConstraint>;
export type MinLengthSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, MinLengthConstraint>;
export type MaxLengthSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, MaxLengthConstraint>;
export type MinSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, MinConstraint>;
export type MaxSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, MaxConstraint>;
export type IntegerSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, IntegerConstraint>;
export type DefaultSettable<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = ExtractConstraint<F, DefaultConstraint>;

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
export type FieldTypes<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = F extends { type: infer N } ? N : never;

export type ConstraintNames<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = F extends FieldConstraints<
  { [key in infer N]?: any } & { [key in infer M]: any }
>
  ? N & M
  : never;

/**
 * Extract generic types and constraint names from Field union type by constraint
 */

export type HasConstraintsProperty<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = F extends BaseField<string, infer C> ? F & { constraints: C } : never;

export type HasConstraints<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
  N extends ConstraintNames<F>,
> = F extends BaseField<string, infer C>
  ? F & {
      constraints: {
        [K in N]-?: F['constraints'][K],
        [L in Exclude<ConstraintNames<F>, N>]: F[L],
      };
    }
  : never;

export function isField<F>(
  field: F,
): field is F extends BaseField<string, ConstraintsProperty<KeyType, any>>
  ? F
  : never {
  return (
    typeof field === 'object' &&
    field !== null &&
    'type' in field &&
    'name' in field
  );
}

export function hasSomeConstraints<F>(
  field: F,
): field is HasConstraintsProperty<IsField<F>> {
  return isField(field) && !!field.constraints;
}

export function hasConstraint<
  F,
  N extends ConstraintNames<
    BaseField<string, ConstraintsProperty<KeyType, any>>
  > = ConstraintNames<Field>,
>(field: F, constraintName: N): field is HasConstraints<IsField<F>, N> {
  return hasSomeConstraints(field) && constraintName in field.constraints;
}

export function hasConstraintFactory<
  N extends ConstraintNames<
    BaseField<string, ConstraintsProperty<KeyType, any>>
  > = ConstraintNames<Field>,
>(constraintName: N) {
  return <F>(
    field: F,
  ): field is F extends BaseField<string, ConstraintsProperty<KeyType, any>>
    ? HasConstraints<IsField<F>, N>
    : never => hasConstraint(field, constraintName);
}

export function isUnique<F>(
  field: F,
): field is HasConstraints<IsField<F>, 'unique'> {
  return hasSomeConstraints(field) && 'unique' in field.constraints;
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
// export const isUnique = hasConstraintFactory('unique');
export const isNotNull = hasConstraintFactory('notNull');
export const isSearchable = hasConstraintFactory('searchable');
export const isMultiple = hasConstraintFactory('multiple');
export const isSortable = hasConstraintFactory('sortable');
export const hasMinLength = hasConstraintFactory('minLength');
export const hasMaxLength = hasConstraintFactory('maxLength');
export const hasMin = hasConstraintFactory('min');
export const hasMax = hasConstraintFactory('max');
export const isInteger = hasConstraintFactory('integer');
export const hasDefault = hasConstraintFactory('defaultValue');

export type FieldOptions<
  T extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = Omit<T, 'name' | 'type' | 'constraints'>;
export type EmptyConstraintsOptions<
  F extends BaseField<string, ConstraintsProperty<KeyType, any>>,
> = F['constraints'];

export const fieldFactory =
  <
    T extends FieldTypes<Field>,
    F extends BaseField<string, ConstraintsProperty<KeyType, any>> & {
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
