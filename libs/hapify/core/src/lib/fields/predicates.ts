import {
  EmbeddedField,
  HiddenField,
  InternalField,
  LabelField,
  MultipleField,
  NullableField,
  OwnershipField,
  PrimaryField,
  RestrictedField,
  SearchableField,
  SortableField,
  UniqueField,
} from '../interfaces';
import { Field } from './field';

/**
 * Checks if a field is a flagged as primary
 */
export function isPrimary<T extends Field>(
  field: T,
): field is T & PrimaryField {
  return field.primary;
}

/**
 * Checks if a field is a flagged as primary
 */
export function isUnique<T extends Field>(field: T): field is T & UniqueField {
  return field.unique;
}

/**
 * Checks if a field is a flagged as label
 */
export function isLabel<T extends Field>(field: T): field is T & LabelField {
  return field.label;
}

/**
 * Checks if a field is a flagged as nullable
 */
export function isNullable<T extends Field>(
  field: T,
): field is T & NullableField {
  return field.nullable;
}

/**
 * Checks if a field is a flagged as multiple
 */
export function isMultiple<T extends Field>(
  field: T,
): field is T & MultipleField {
  return field.multiple;
}

/**
 * Checks if a field is a flagged as embedded
 */
export function isEmbedded<T extends Field>(
  field: T,
): field is T & EmbeddedField {
  return field.embedded;
}

/**
 * Checks if a field is a flagged as searchable
 */
export function isSearchable<T extends Field>(
  field: T,
): field is T & SearchableField {
  return field.searchable;
}

/**
 * Checks if a field is a flagged as sortable
 */
export function isSortable<T extends Field>(
  field: T,
): field is T & SortableField {
  return field.sortable;
}

/**
 * Checks if a field is a flagged as hidden
 */
export function isHidden<T extends Field>(field: T): field is T & HiddenField {
  return field.hidden;
}

/**
 * Checks if a field is a flagged as internal
 */
export function isInternal<T extends Field>(
  field: T,
): field is T & InternalField {
  return field.internal;
}

/**
 * Checks if a field is a flagged as restricted
 */
export function isRestricted<T extends Field>(
  field: T,
): field is T & RestrictedField {
  return field.restricted;
}

/**
 * Checks if a field is a flagged as ownership
 */
export function isOwnership<T extends Field>(
  field: T,
): field is T & OwnershipField {
  return field.ownership;
}
