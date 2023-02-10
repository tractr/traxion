import {
  BaseField,
  BaseScalarField,
  Field,
  PrimaryField,
  ScalarField,
  StringPasswordField,
  VirtualField,
} from '../../../nodes';
import {
  LabelField,
  MultipleField,
  NullableField,
  SearchableField,
  SortableField,
  UniqueField,
} from '../../interfaces';

// TODO: validate subset prediction
/**
 * Checks if a field is a flagged as primary
 */
export function isPrimary<T extends Field>(
  field: T,
): field is T & PrimaryField {
  return 'primary' in field && field.primary;
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
 * Checks if a field is a flagged as sortable
 */
export function isSortable<T extends BaseField>(
  field: T,
): field is T & SortableField {
  return field.sortable;
}
