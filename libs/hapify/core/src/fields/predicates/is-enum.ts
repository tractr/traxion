import { EnumType } from '../base-types';

/**
 * Predicate to know if we got an enum type
 * @param value
 * @returns
 */
export function isEnum(value: unknown): value is EnumType {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.values(value).every(
      (v) => typeof v === 'string' || typeof v === 'number',
    )
  );
}
