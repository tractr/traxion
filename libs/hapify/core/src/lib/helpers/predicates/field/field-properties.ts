import { BaseField } from '../../../nodes';
import {
  LabelField,
  MultipleField,
  NullableField,
  PrimaryField,
  SearchableField,
  SortableField,
  UniqueField,
} from '../../interfaces';

/**
 * Checks if a field is a flagged as primary
 */
export function isPrimary<T extends BaseField>(
  field: T,
): field is T & PrimaryField {
  return field.primary;
}

/**
 * Checks if a field is a flagged as primary
 */
export function isUnique<T extends BaseField>(
  field: T,
): field is T & UniqueField {
  return field.unique;
}

/**
 * Checks if a field is a flagged as label
 */
export function isLabel<T extends BaseField>(
  field: T,
): field is T & LabelField {
  return field.label;
}

/**
 * Checks if a field is a flagged as nullable
 */
export function isNullable<T extends BaseField>(
  field: T,
): field is T & NullableField {
  return field.nullable;
}

/**
 * Checks if a field is a flagged as multiple
 */
export function isMultiple<T extends BaseField>(
  field: T,
): field is T & MultipleField {
  return field.multiple;
}

/**
 * Checks if a field is a flagged as searchable
 */
export function isSearchable<T extends BaseField>(
  field: T,
): field is T & SearchableField {
  return field.searchable;
}

/**
 * Checks if a field is a flagged as sortable
 */
export function isSortable<T extends BaseField>(
  field: T,
): field is T & SortableField {
  return field.sortable;
}
