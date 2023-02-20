/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import type { Relation } from './schema.type';

/**
 * Base field properties
 *
 */
export type BaseFieldProperties<T extends string = string> = {
  type: T;
  name: string;
  metadata?: Record<string, string>;
  notes?: string;
};

/**
 * Constraints
 */

/**
 * Key type of constraints
 */
export type KeyType = string | number | symbol;

/**
 * A Required constraint
 */
export type RequiredConstraint<Key extends KeyType, Type> = {
  [key in Key]: Type;
};

/**
 * An Optional constraint
 */
export type OptionalConstraint<Key extends KeyType, Type> = {
  [key in Key]?: Type;
};

/**
 * Constraint
 */
export type Constraints<Key extends KeyType, Type> = OptionalConstraint<
  Key,
  Type
>;

export type EmptyConstraints = Constraints<never, any>;

/**
 * Field
 */
export type BaseField<
  T extends string = string,
  C extends Constraints<KeyType, any> = EmptyConstraints,
> = BaseFieldProperties<T> & C;

/**
 * Type predicate that insures a field as a field of the required type
 */
export type IsField<F> = F extends BaseField<string, Constraints<KeyType, any>>
  ? F
  : never;

/**
 * Extract the shared constraints from fields
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 * type B = BaseField<'number', { b: number; c: string }>;
 * type C = BaseField<'boolean', { c: boolean }>;
 *
 * type D = GetSharedConstraints<A>; // D = { a: string, c?: string | undefined; }
 * type E = GetSharedConstraints<B>; // E = { b: number, c: string }
 * type F = GetSharedConstraints<C>; // F = { c: boolean }
 * type G = GetSharedConstraints<A | B>; // G = { c?: string | undefined; }
 * type H = GetSharedConstraints<A | B | C>; // H = { c?: string | boolean | undefined; }
 */
export type GetSharedConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = Omit<F, keyof BaseFieldProperties>;

/**
 * Extract all constraints from fields
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 * type B = BaseField<'number', { b: number; c: string }>;
 * type C = BaseField<'boolean', { c: boolean }>;
 *
 * type D = GetConstraints<A>; // D = { a: string, c?: string | undefined; }
 * type E = GetConstraints<B>; // E = { b: number, c: string }
 * type F = GetConstraints<C>; // F = { c: boolean }
 * type G = GetConstraints<A | B>; // G = { a: string, c?: string | undefined; } | { b: number, c: string }
 * type H = GetConstraints<A | B | C>; // H = { a: string, c?: string | undefined; } | { b: number, c: string } | { c: boolean }
 *
 */
export type GetConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = F extends BaseField<string, Constraints<KeyType, any>>
  ? Omit<F, keyof BaseFieldProperties>
  : never;

/**
 * Get the fields that has the same constraints as C
 *
 * @example
 *
 * type A = BaseField<'string', { a: string }>;
 * type B = BaseField<'number', { b: number }>;
 * type C = BaseField<'boolean', { c: boolean }>;
 *
 * type D = GetFieldsWithConstraints<A | B | C, { a: string }>; // D = A
 * type E = GetFieldsWithConstraints<A | B | C, { b: number }>; // E = B
 * type F = GetFieldsWithConstraints<A | B | C, { c: boolean }>; // F = C
 * type G = GetFieldsWithConstraints<A | B | C, { a: string; b: number }>; // G = never
 * type H = GetFieldsWithConstraints<A | B | C, { a: string } | { b: number; }>; // H = A | B
 */
export type GetFieldsWithConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  C extends Constraints<KeyType, any>,
> = F extends BaseField<string, Constraints<KeyType, any>>
  ? GetSharedConstraints<F> extends C
    ? F
    : never
  : never;

/**
 * Get the fields that has the same constraints as C
 *
 * @example
 *
 * type A = BaseField<'string', { a: string }>;
 * type B = BaseField<'number', { b: number }>;
 * type C = BaseField<'boolean', { c: boolean }>;
 *
 * type D = GetFieldsWithConstraintsNames<A | B | C, 'a'>; // D = A
 * type E = GetFieldsWithConstraintsNames<A | B | C, 'b'>; // E = B
 * type F = GetFieldsWithConstraintsNames<A | B | C, 'c'>; // F = C
 * type H = GetFieldsWithConstraintsNames<A | B | C, 'a' | 'b'>; // H = A | B
 * type I = GetFieldsWithConstraintsNames<A, 'a' | 'b'>; // I = A
 * type J = GetFieldsWithConstraintsNames<A, 'b'>; // J = never
 */
export type GetFieldsWithConstraintsNames<
  F extends BaseField<string, Constraints<KeyType, any>>,
  C extends KeyType,
> = F extends BaseField<string, Constraints<KeyType, any>>
  ? C extends GetConstraintsNames<F>
    ? F
    : never
  : never;

/**
 * Extract a field type from a Field union type by his type property
 *
 * @example
 *
 * type A = BaseField<'string'>;
 * type B = BaseField<'number'>;
 * type C = BaseField<'boolean'>;
 * type D = BaseField<'string'>;
 * type E = BaseField<'number'>;
 *
 * type F = ExtractField<A | B | C | D | E, 'string'>; // F = A | D
 */
export type ExtractField<
  F extends BaseField<string, Constraints<KeyType, any>>,
  T extends string,
> = F extends BaseField<T, Constraints<KeyType, any>>
  ? Extract<F, { type: T }>
  : never;

/**
 * Get the generics types of fields from another Field union type
 *
 * @example
 *
 * type A = BaseField<'string'>;
 * type B = BaseField<'number'>;
 * type C = BaseField<'boolean'>;
 * type D = BaseField<'string'>;
 * type E = BaseField<'number'>;
 *
 * type F = GetFieldType<A | B, C | D | E>; // F = D | E
 */
export type GetFieldType<
  F extends BaseField<string, Constraints<KeyType, any>>,
  U extends BaseField<string, Constraints<KeyType, any>>,
> = F extends BaseField<infer T, Constraints<KeyType, any>>
  ? ExtractField<U, T>
  : never;

/**
 * Get Fields by type
 *
 * @example
 *
 * type A = BaseField<'string'>;
 * type B = BaseField<'number'>;
 * type C = BaseField<'boolean'>;
 *
 * type D = GetFieldTypeWithType<A | B | C, 'string'>; // D = A
 * type E = GetFieldTypeWithType<A | B | C, 'number'>; // E = B
 * type F = GetFieldTypeWithType<A | B | C, 'boolean'>; // F = C
 * type G = GetFieldTypeWithType<A | B | C, 'string' | 'number'>; // G = A | B
 * type H = GetFieldTypeWithType<A | B | C, 'string' | 'number' | 'boolean'>; // H = A | B | C
 * type I = GetFieldTypeWithType<A | B | C, 'unknown'>; // I = never
 */
export type GetFieldTypeWithType<
  F extends BaseField<string, Constraints<KeyType, any>>,
  T extends string,
> = F extends BaseField<T, Constraints<KeyType, any>>
  ? GetType<F> extends T
    ? F
    : never
  : never;

/**
 * Get the types of fields
 *
 * @example
 *
 * type A = BaseField<'string'>;
 * type B = BaseField<'number'>;
 * type C = BaseField<'boolean'>;
 *
 * type D = GetType<A>; // D = 'string'
 * type E = GetType<B>; // E = 'number'
 * type F = GetType<C>; // F = 'boolean'
 * type G = GetType<A | B | C>; // G = 'string' | 'number' | 'boolean'
 */
export type GetType<F extends BaseField<string, any>> = F extends {
  type: infer N;
}
  ? N
  : never;

/**
 * Get the names of the all the constraints of a union field
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 * type B = BaseField<'number', { b: number; c: string }>;
 * type C = BaseField<'boolean', { c: boolean }>;
 *
 * type D = GetConstraintsNames<A>; // D = 'a' | 'c'
 * type E = GetConstraintsNames<B>; // E = 'b' | 'c'
 * type F = GetConstraintsNames<C>; // F = 'c'
 * type G = GetConstraintsNames<A | B>; // G = 'a' | 'b' | 'c'
 * type H = GetConstraintsNames<A | B | C>; // H = 'a' | 'b' | 'c'
 */
export type GetConstraintsNames<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = F extends BaseField<string, Constraints<KeyType, any>>
  ? keyof GetConstraints<F>
  : never;

/**
 * Get the fields that has at least one constraint
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 * type B = BaseField<'number', { b: number; c: string }>;
 * type C = BaseField<'boolean'>;
 *
 * type D = HasSomeConstraints<A>; // D = A
 * type E = HasSomeConstraints<B>; // E = B
 * type F = HasSomeConstraints<C>; // F = never
 * type G = HasSomeConstraints<A | B | C>; // G = A | B
 *
 */
export type HasSomeConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = F extends BaseField<string, Constraints<KeyType, any>>
  ? EmptyConstraints extends GetConstraints<F>
    ? never
    : F
  : never;

/**
 * Get the fields that match the constraints and mark them as required
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 * type B = BaseField<'number', { b: number; c: number }>;
 * type C = BaseField<'boolean'>;
 *
 * type test = GetFieldsWithConstraintsNames<A, 'a' | 'c' | 'd'>;
 * type D = HasConstraints<A, 'a'>; // D = A & { a: string }
 * type E = HasConstraints<A, 'b'>; // E = never
 * type F = HasConstraints<A, 'c'>; // F = A & { c: string }
 * type G = HasConstraints<A, 'a' | 'c' | 'd'>; // G = A & { a: string; c: string, d: never }
 * type H = HasConstraints<A | B, 'a' | 'c'>; // H = A & { a: string; c: string } | B & { a: never, c: number }
 * type I = HasConstraints<A | B, 'a' | 'd'>; // I = A & { a: string; & d: never }
 * type J = HasConstraints<A | B, 'c'>; // J = A & { c: string } | B & { c: number }
 * type K = HasConstraints<A | B, 'b'>; // K = B & { b: string }
 * type L = HasConstraints<A | B, 'c'>; // L = A & { c: string } | B & { c: number }
 * type M = HasConstraints<A | B | C, 'b' | 'c'>; // M = A & { b: never,c: string } | B & { b: number, c: number }
 *
 */
export type HasConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  N extends KeyType,
> = F extends GetFieldsWithConstraintsNames<F, N>
  ? F & {
      [K in N]-?: K extends GetConstraintsNames<F>
        ? Exclude<F[K], undefined>
        : never;
    }
  : never;

/**
 * Get the fields that match the constraints and mark them as true if they are boolean or required if they are not
 *
 * @example
 *
 * type A = BaseField<'string', { a: boolean; c?: string }>;
 * type B = BaseField<'number', { b: boolean; c: number }>;
 *
 * type C = IsConstraints<A, 'a'>; // D = A & { a: true }
 * type D = IsConstraints<A, 'b'>; // E = never
 * type E = IsConstraints<A, 'c'>; // F = A & { c: string }
 * type F = IsConstraints<A, 'a' | 'c' | 'd'>; // G = A & { a: true; c: string, d: never }
 * type G = IsConstraints<A | B, 'a' | 'c'>; // H = A & { a: true; c: string } | B & { a: never; c: number }
 * type H = IsConstraints<A | B, 'a' | 'd'>; // I = A & { a: true; d: never; }
 * type I = IsConstraints<A | B, 'c'>; // J = A & { c: string } | B & { c: number }
 * type J = IsConstraints<A | B, 'b'>; // K = B & { b: true }
 */
export type IsConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  N extends KeyType,
> = F extends GetFieldsWithConstraintsNames<F, N>
  ? F & {
      [K in N]-?: K extends GetConstraintsNames<F>
        ? Exclude<F[K], undefined> extends boolean
          ? true
          : Exclude<F[K], undefined>
        : never;
    }
  : never;

/**
 * Assert if field is a Field
 *
 * @param field
 * @returns
 */
export function isField<F>(field: F): field is IsField<F> {
  return (
    typeof field === 'object' &&
    field !== null &&
    'type' in field &&
    'name' in field
  );
}

/**
 * Assert if field has a constraint by name
 * @param field
 * @param constraintName
 * @returns
 *
 * @example
 *
 * type A = BaseField<'string', { a: boolean; c?: string }>;
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * hasConstraint(a, 'a'); // true
 * hasConstraint(a, 'b'); // false
 * hasConstraint(a, 'c'); // false
 * hasConstraint(a, 'd'); // false
 *
 * a.c = 'c';
 *
 * hasConstraint(a, 'a'); // true
 * hasConstraint(a, 'b'); // false
 * hasConstraint(a, 'c'); // true
 * hasConstraint(a, 'd'); // false
 *
 * a.a = false;
 * hasConstraint(a, 'a'); // true
 * hasConstraint(a, 'b'); // false
 * hasConstraint(a, 'c'); // true
 * hasConstraint(a, 'd'); // false
 */
export function hasConstraint<F, N extends KeyType>(
  field: F,
  constraintName: N,
): field is HasConstraints<IsField<F>, N> {
  return isField(field) && constraintName in field;
}

/**
 * Assert if field has a constraint by name and if it is a truthy value
 * @param field
 * @param constraintName
 * @returns
 *
 * @example
 *
 * type A = BaseField<'string', { a: boolean; c?: string }>;
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * isConstraint(a, 'a'); // true
 * isConstraint(a, 'b'); // false
 * isConstraint(a, 'c'); // false
 * isConstraint(a, 'd'); // false
 *
 * a.c = 'c';
 * isConstraint(a, 'a'); // true
 * isConstraint(a, 'b'); // false
 * isConstraint(a, 'c'); // true
 * isConstraint(a, 'd'); // false
 *
 * a.a = false;
 * isConstraint(a, 'a'); // false
 * isConstraint(a, 'b'); // false
 * isConstraint(a, 'c'); // true
 * isConstraint(a, 'd'); // false
 */
export function isConstraint<F, N extends KeyType>(
  field: F,
  constraintName: N,
): field is IsConstraints<IsField<F>, N> {
  return hasConstraint(field, constraintName) && !!field[constraintName];
}

/**
 * Factory to create a function that asserts if field has a constraint by name
 * @param constraintName
 * @returns
 *
 * @example
 *
 * type A = BaseField<'string', { a: string; c?: string }>;
 *
 * const hasA = hasConstraintFactory('a');
 * const hasB = hasConstraintFactory('b');
 * const hasC = hasConstraintFactory('c');
 * const hasD = hasConstraintFactory('d');
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * hasA(a); // true
 * hasB(a); // false
 * hasC(a); // false
 * hasD(a); // false
 *
 * a.c = 'c';
 *
 * hasA(a); // true
 * hasB(a); // false
 * hasC(a); // true
 * hasD(a); // false
 *
 * a.a = false;
 * hasA(a); // true
 * hasB(a); // false
 * hasC(a); // true
 * hasD(a); // false
 */
export function hasConstraintFactory<
  N extends GetConstraintsNames<
    BaseField<string, Constraints<KeyType, any>>
  > = GetConstraintsNames<Field>,
>(constraintName: N) {
  return <F>(
    field: F,
  ): field is F extends BaseField<string, Constraints<KeyType, any>>
    ? N extends GetConstraintsNames<F>
      ? HasConstraints<F, N>
      : never
    : never => hasConstraint(field, constraintName);
}

/**
 * Factory to create a function that assert if field has a constraint by name and if it is a truthy value
 * @param constraintName
 * @returns
 *
 * @example
 *
 * type A = BaseField<'string', { a: boolean; c?: string }>;
 *
 * const isA = isConstraintFactory('a');
 * const isB = isConstraintFactory('b');
 * const isC = isConstraintFactory('c');
 * const isD = isConstraintFactory('d');
 *
 * let a: A = { type: 'string', name: 'a', a: true };
 *
 * isA(a); // true
 * isB(a); // false
 * isC(a); // false
 * isD(a) // false
 *
 * a.c = 'c';
 * isA(a); // true
 * isB(a); // false
 * isC(a); // true
 * isD(a) // false
 *
 * a.a = false;
 * isA(a); // false
 * isB(a); // false
 * isC(a); // true
 * isD(a) // false
 */
export function isConstraintFactory<
  N extends GetConstraintsNames<
    BaseField<string, Constraints<KeyType, any>>
  > = GetConstraintsNames<Field>,
>(constraintName: N) {
  return <F>(
    field: F,
  ): field is F extends BaseField<string, Constraints<infer K, any>>
    ? N extends GetConstraintsNames<F>
      ? IsConstraints<F, N>
      : never
    : never => isConstraint(field, constraintName);
}

/**
 * Make a predicate to filter out fields by type
 * @param type
 * @returns
 *
 * @example
 *
 * type Field = StringField | NumberField | BooleanField;
 *
 * const fields = [
 *   { type: 'string', name: 'a' },
 *   { type: 'number', name: 'b' },
 *   { type: 'string', name: 'c' },
 * ];
 *
 * const strings: StringField[] = fields.filter(isFieldFactory<Field>('string'));
 */
export function isFieldFactory<
  FT extends BaseField<string, Constraints<KeyType, any>> = Field,
  T extends GetType<BaseField<string, Constraints<KeyType, any>>> = GetType<FT>,
>(type: T) {
  return <F>(field: F): field is IsField<F> & GetFieldType<IsField<F>, FT> =>
    isField(field) && field.type === type;
}

/**
 * Get the field options from BaseField
 */
export type FieldOptions<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = Partial<Omit<F, 'name' | 'type' | GetConstraintsNames<F>>>;

/**
 * Create a field factory
 * @param type
 * @param name
 * @param constraints
 * @param options
 * @returns
 */
export function createField<
  F extends BaseField<string, Constraints<KeyType, any>> = Field,
  T extends GetType<F> = GetType<F>,
  C extends Constraints<KeyType, any> = GetConstraints<F>,
  O extends FieldOptions<F> = FieldOptions<F>,
>(type: T, name: string, constraints: C, options: O = {} as O) {
  return {
    type,
    name,
    ...constraints,
    ...options,
  } as unknown as GetFieldTypeWithType<F, T> & C & O;
}

/**
 * Factory to create a field
 * @param type
 * @param defaultConstraints
 * @param defaultOptions
 * @returns
 */
export const fieldFactory =
  <
    F extends BaseField<string, Constraints<KeyType, any>> = Field,
    T extends GetType<F> = GetType<F>,
    DC extends Constraints<KeyType, any> = GetConstraints<F>,
    DO extends FieldOptions<F> = FieldOptions<F>,
  >(
    type: T,
    defaultConstraints?: DC,
    defaultOptions: DO = {} as DO,
  ) =>
  <
    C extends Constraints<KeyType, any> = GetConstraints<F>,
    O extends FieldOptions<F> = FieldOptions<F>,
  >(
    name: string,
    constraints?: C,
    options: O = {} as O,
  ) =>
    // createField(field, name, { ...defaultConstraints, ...constraints }, { ...defaultOptions, ...options }})
    ({
      type,
      name,
      ...defaultConstraints,
      ...constraints,
      ...defaultOptions,
      ...options,
    } as unknown as GetFieldTypeWithType<F, T> & C & O & DC & DO);

/** ------------------ Traxion ------------------ */

/**
 * Field Base constraints
 */
export type BaseConstraint = LabelConstraint &
  UniqueConstraint &
  NullConstraint &
  DefaultConstraint &
  MultipleConstraint &
  SearchableConstraint &
  SortableConstraint;

export type LabelConstraint = OptionalConstraint<'isLabel', boolean>;
export type UniqueConstraint = OptionalConstraint<'isUnique', boolean>;
export type NullConstraint = OptionalConstraint<'isNull', boolean>;
export type DefaultConstraint = OptionalConstraint<'defaultValue', any>;
export type MultipleConstraint = OptionalConstraint<'isMultiple', boolean>;
export type SearchableConstraint = OptionalConstraint<'isSearchable', boolean>;
export type SortableConstraint = OptionalConstraint<'isSortable', boolean>;

/**
 * StringField Base constraints
 */
export type StringFieldConstraint = OptionalConstraint<'minLength', number>;
export type MinLengthConstraint = OptionalConstraint<'minLength', number>;
export type MaxLengthConstraint = OptionalConstraint<'maxLength', number>;
export type MinConstraint = OptionalConstraint<'min', number>;
export type MaxConstraint = OptionalConstraint<'max', number>;
export type IntegerConstraint = OptionalConstraint<'isInteger', boolean>;
export type PasswordConstraint = OptionalConstraint<'defaultValue', any>;

export type RelationsConstraint = Constraints<'relations', Relation[]>;
export type RelationConstraint = Constraints<'relation', Relation>;

/**
 * Base field constraints
 */

/**
 * StringField type
 */
export type StringField = BaseField<
  'string',
  BaseConstraint &
    SearchableConstraint &
    SortableConstraint &
    MinLengthConstraint &
    MaxLengthConstraint
>;

/**
 * Number field type
 */
export type NumberField = BaseField<
  'number',
  BaseConstraint &
    SearchableConstraint &
    SortableConstraint &
    IntegerConstraint &
    MinConstraint &
    MaxConstraint
>;

/**
 * Boolean field type
 */
export type BooleanField = BaseField<
  'boolean',
  BaseConstraint & SearchableConstraint & SortableConstraint
>;

/**
 * Primary field type
 */
export type PrimaryKeyField = BaseField<
  'primary',
  BaseConstraint & RelationsConstraint
>;

/**
 * Foreign field type
 */
export type ForeignKeyField = HasConstraints<
  BaseField<'foreign', BaseConstraint & RelationConstraint>,
  'isUnique'
>;

/**
 * Virtual field type
 */
export type VirtualRelationField = BaseField<
  'virtual',
  BaseConstraint & RelationConstraint
>;

/**
 * All Traxion Fields
 */
export type Field =
  | StringField
  | NumberField
  | BooleanField
  | PrimaryKeyField
  | ForeignKeyField
  | VirtualRelationField;

/**
 * Extract generic types by constraint
 */
export type LabelSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, LabelConstraint>;
export type UniqueSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, UniqueConstraint>;
export type NullSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, NullConstraint>;
export type MultipleSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, MultipleConstraint>;
export type Searchable<F extends BaseField<string, Constraints<KeyType, any>>> =
  GetFieldsWithConstraints<F, SearchableConstraint>;
export type Sortable<F extends BaseField<string, Constraints<KeyType, any>>> =
  GetFieldsWithConstraints<F, SortableConstraint>;
export type MinLengthSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, MinLengthConstraint>;
export type MaxLengthSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, MaxLengthConstraint>;
export type MinSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, MinConstraint>;
export type MaxSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, MaxConstraint>;
export type IntegerSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, IntegerConstraint>;
export type DefaultSettable<
  F extends BaseField<string, Constraints<KeyType, any>>,
> = GetFieldsWithConstraints<F, DefaultConstraint>;

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

export const isString = isFieldFactory('string');
export const isNumber = isFieldFactory('number');
export const isBoolean = isFieldFactory('boolean');
export const isUnique = isConstraintFactory('isUnique');
export const isNull = isConstraintFactory('isNull');
export const isSearchable = isConstraintFactory('isSearchable');
export const isMultiple = isConstraintFactory('isMultiple');
export const isSortable = isConstraintFactory('isSortable');
export const isInteger = isConstraintFactory('isInteger');

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

export const stringField = fieldFactory('string');
export const numberField = fieldFactory('number');
export const booleanField = fieldFactory('boolean');
export const primaryField = fieldFactory('primary');
export const foreignField = fieldFactory('foreign', { isUnique: true });
export const virtualField = fieldFactory('virtual');
