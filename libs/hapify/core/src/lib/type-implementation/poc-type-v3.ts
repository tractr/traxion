/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Object } from 'ts-toolbelt';
import { Cast } from 'ts-toolbelt/out/Any/Cast';

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
export type Constraint<Key extends string | number | symbol, Type> = {
  [key in Key]: Type;
};

export type OptionalConstraint<Key extends string | number | symbol, Type> = {
  [key in Key]?: Type;
};

export type ConstraintsProperty<Key extends string | number | symbol, Type> =
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
export type FieldConstraints<C extends ConstraintsProperty<string, any>> = {
  0: { constraints: C };
  1: { constraints?: C };
}[Partial<C> extends C ? 1 : 0];

export type BaseFieldType<T extends string> = BaseFieldProperties & {
  type: T;
};

export type BaseField<
  T extends string,
  C extends ConstraintsProperty<string, any>,
> = BaseFieldType<T> & FieldConstraints<C>;

export type IsField<F> = F extends BaseField<
  string,
  ConstraintsProperty<string, any>
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
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = F extends {
  constraints?: infer C;
}
  ? C
  : never;

export type ExtractConstraint<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
  C extends ConstraintsProperty<string, any>,
> = F extends BaseField<string, ConstraintsProperty<infer K, infer T>>
  ? C extends ConstraintsProperty<K, T>
    ? F
    : never
  : never;

/**
 * Extract generic types by constraint
 */
export type LabelSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, LabelConstraint>;
export type UniqueSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, UniqueConstraint>;
export type NotNullSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, NotNullConstraint>;
export type MultipleSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, MultipleConstraint>;
export type Searchable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, SearchableConstraint>;
export type Sortable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, SortableConstraint>;
export type MinLengthSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, MinLengthConstraint>;
export type MaxLengthSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, MaxLengthConstraint>;
export type MinSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, MinConstraint>;
export type MaxSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, MaxConstraint>;
export type IntegerSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = ExtractConstraint<F, IntegerConstraint>;
export type DefaultSettable<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
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
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = F extends { type: infer N } ? N : never;

export type ConstraintNames<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = F extends {
  constraints?: { [key in infer N]?: any };
}
  ? N
  : never;

/**
 * Extract generic types and constraint names from Field union type by constraint
 */

export type HasConstraintsProperty<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = F extends BaseField<string, ConstraintsProperty<string, any>>
  ? F & { constraints: GetConstraints<F> }
  : never;

export type HasConstraints<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
  N extends keyof GetConstraints<F>,
> = F extends BaseField<string, ConstraintsProperty<infer C, any>>
  ? HasConstraintsProperty<F> & {
      constraints: { [key in N]-?: GetConstraints<F>[key] };
    }
  : never;

export function isField(
  field: unknown,
): field is BaseField<string, ConstraintsProperty<string, any>> {
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
  N extends ConstraintNames<
    BaseField<string, ConstraintsProperty<string, any>>
  > = ConstraintNames<Field>,
>(constraintName: N) {
  return <F>(field: F): field is HasConstraints<IsField<F>, N> =>
    hasSomeConstraints(field) && constraintName in field.constraints;
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

export type FieldOptions<
  T extends BaseField<string, ConstraintsProperty<string, any>>,
> = Omit<T, 'name' | 'type' | 'constraints'>;
export type EmptyConstraintsOptions<
  F extends BaseField<string, ConstraintsProperty<string, any>>,
> = F['constraints'];

export const fieldFactory =
  <
    T extends FieldTypes<Field>,
    F extends BaseField<string, ConstraintsProperty<string, any>> & { type: T },
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
