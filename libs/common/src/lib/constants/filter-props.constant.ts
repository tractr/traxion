export const ArrayFilterProps = [
  'equals',
  'has',
  'hasEvery',
  'hasSome',
  'isEmpty',
];
export type ArrayFilterProps =
  | 'equals'
  | 'has'
  | 'hasEvery'
  | 'hasSome'
  | 'isEmpty';

export const BoolFilterProps = ['equals'];
export type BoolFilterProps = 'equals';

export const DateTimeFilterProps = [
  'equals',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
];
export type DateTimeFilterProps =
  | 'equals'
  | 'in'
  | 'notIn'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte';

export const JsonFilterProps = [
  'equals',
  'path',
  'string_contains',
  'string_starts_with',
  'string_ends_with',
  'array_contains',
  'array_starts_with',
  'array_ends_with',
  'lt',
  'lte',
  'gt',
  'gte',
  'not',
];
export type JsonFilterProps =
  | 'equals'
  | 'path'
  | 'string_contains'
  | 'string_starts_with'
  | 'string_ends_with'
  | 'array_contains'
  | 'array_starts_with'
  | 'array_ends_with'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'not';

export const NumberFilterProps = ['equals', 'lt', 'lte', 'gt', 'gte'];
export type NumberFilterProps = 'equals' | 'lt' | 'lte' | 'gt' | 'gte';

export const StringFilterProps = [
  'equals',
  'in',
  'notIn',
  'lt',
  'lte',
  'gt',
  'gte',
  'contains',
  'startsWith',
  'endsWith',
];
export type StringFilterProps =
  | 'equals'
  | 'in'
  | 'notIn'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

export const EnumFilterProps = ['equals', 'in', 'notIn', 'not'];
export type EnumFilterProps = 'equals' | 'in' | 'notIn' | 'not';
