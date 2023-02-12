import { BaseField } from '../../../nodes';
import { Label, NotNull, Searchable, Unique } from '../../../nodes/constraints';
import { Multiple } from '../../../nodes/constraints/any/multiple';
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
  return Object.values(field.constraints).some(
    (constraint) => constraint instanceof Unique,
  );
}

/**
 * Checks if a field is a flagged as label
 */
export function isLabel<T extends BaseField>(
  field: T,
): field is T & LabelField {
  return Object.values(field.constraints).some(
    (constraint) => constraint instanceof Label,
  );
}

/**
 * Checks if a field is a flagged as nullable
 */
export function isNullable<T extends BaseField>(
  field: T,
): field is T & NullableField {
  return Object.values(field.constraints).every(
    (constraint) => !(constraint instanceof NotNull),
  );
}

/**
 * Checks if a field is a flagged as multiple
 */
export function isMultiple<T extends BaseField>(
  field: T,
): field is T & MultipleField {
  return Object.values(field.constraints).some(
    (constraint) => constraint instanceof Multiple,
  );
}

/**
 * Checks if a field is a flagged as searchable
 */
export function isSearchable<T extends BaseField>(
  field: T,
): field is T & SearchableField {
  return Object.values(field.constraints).some(
    (constraint) => constraint instanceof Searchable,
  );
}

/**
 * Checks if a field is a flagged as sortable
 */
export function isSortable<T extends BaseField>(
  field: T,
): field is T & SortableField {
  return field.sortable; // Est ce que l'on a une utilité à cette propriété ?
}
