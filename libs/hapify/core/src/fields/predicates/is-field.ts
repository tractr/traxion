import { IsField } from '../base-types';

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
