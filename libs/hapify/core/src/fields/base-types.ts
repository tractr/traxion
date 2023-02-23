/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Field } from './field';

export type EnumType = {
  name: string;
  values: Record<string, string | number>;
  metadata?: Record<string, string>;
  notes?: string;
};

export enum PermissionType {
  'public' = 'public',
  'authenticated' = 'authenticated',
  'internal' = 'internal',
}

export type BaseProperties = {
  name: string;
  pluralName: string;
  metadata?: Record<string, string>;
  notes?: string;
};

/**
 * Base field properties
 *
 */
export type BaseFieldProperties<T extends string = string> = BaseProperties & {
  type: T;
};

export type BaseFieldPropertiesKeys = keyof BaseFieldProperties;

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
 * An Conditional constraint
 */
export type ConditionalConstraint<
  Key extends KeyType,
  C extends Constraints<KeyType, string>,
  Option1,
  Option2,
  U,
> = {
  0: OptionalConstraint<Key, Option1>;
  1: OptionalConstraint<Key, Option2>;
}[C extends U ? 0 : 1];

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
  C extends Constraints<KeyType, any> = Constraints<KeyType, any>,
> = BaseFieldProperties<T> & C;

/**
 * Type predicate that insures a field as a field of the required type
 */
export type IsField<F> = Extract<
  F,
  BaseField<string, Constraints<KeyType, any>>
>;

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
 * Get a field from a Field union type by his type property
 *
 * @example
 *
 * type A = GetField<BaseField<'string'>>; // A = StringField
 * type B = GetField<BaseField<'number'>>; // B = NumberField
 * type C = GetField<BaseField<'boolean'>>; // C = BooleanField
 * type D = GetField<BaseField<'string'> | BaseField<'number'>>; // D = StringField | NumberField
 * type E = GetField<BaseField<'string'>, 'string'>; // E = StringField
 * type F = GetField<BaseField<'string'> | BaseField<'number'>, 'string'>; // F = StringField
 * type F = GetField<BaseField<'string'> | BaseField<'number'>, 'boolean'>; // Type error (boolean)
 */
export type GetField<
  F extends BaseField<string, Constraints<KeyType, any>>,
  T extends GetType<F> = GetType<F>,
  AF extends BaseField<string, Constraints<KeyType, any>> = Field,
> = ExtractField<AF, T>;

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
 * type D = GetFieldWithConstraints<A | B | C, { a: string }>; // D = A
 * type E = GetFieldWithConstraints<A | B | C, { b: number }>; // E = B
 * type F = GetFieldWithConstraints<A | B | C, { c: boolean }>; // F = C
 * type G = GetFieldWithConstraints<A | B | C, { a: string; b: number }>; // G = never
 * type H = GetFieldWithConstraints<A | B | C, { a: string } | { b: number; }>; // H = A | B
 */
export type GetFieldWithConstraints<
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
 * type D = GetFieldWithConstraintsNames<A | B | C, 'a'>; // D = A
 * type E = GetFieldWithConstraintsNames<A | B | C, 'b'>; // E = B
 * type F = GetFieldWithConstraintsNames<A | B | C, 'c'>; // F = C
 * type H = GetFieldWithConstraintsNames<A | B | C, 'a' | 'b'>; // H = A | B
 * type I = GetFieldWithConstraintsNames<A, 'a' | 'b'>; // I = A
 * type J = GetFieldWithConstraintsNames<A, 'b'>; // J = never
 */
export type GetFieldWithConstraintsNames<
  F extends BaseField<string, Constraints<KeyType, any>>,
  C extends KeyType,
> = F extends BaseField<string, Constraints<KeyType, any>>
  ? C extends GetConstraintsNames<F>
    ? F
    : never
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
> = F extends GetFieldWithConstraintsNames<F, N>
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
> = F extends GetFieldWithConstraintsNames<F, N>
  ? F & {
      [K in N]-?: K extends GetConstraintsNames<F>
        ? Exclude<F[K], undefined> extends boolean
          ? true
          : Exclude<F[K], undefined>
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
export type LockConstraints<
  F extends BaseField<string, Constraints<KeyType, any>>,
  N extends KeyType,
> = F extends GetFieldWithConstraintsNames<F, N>
  ? F & {
      [K in N]-?: K extends GetConstraintsNames<F>
        ? Exclude<F[K], undefined> extends boolean
          ? true
          : Exclude<F[K], undefined>
        : never;
    }
  : never;
