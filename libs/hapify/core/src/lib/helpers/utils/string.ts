import * as Case from 'case';

import { StringVariations } from '../interfaces';

/** Convert a string to kebab case */
export function kebab(value: string): string {
  return Case.kebab(value);
}

/** Convert a string to snake case */
export function snake(value: string): string {
  return Case.snake(value);
}

/** Convert a string to header case */
export function header(value: string): string {
  return Case.header(value);
}

/** Convert a string to constant case */
export function constant(value: string): string {
  return Case.constant(value);
}

/** Convert a string to big case */
export function big(value: string): string {
  return Case.constant(value).replace(/_/g, '-');
}

/** Convert a string to capital case */
export function capital(value: string): string {
  return Case.capital(value);
}

/** Convert a string to lower case */
export function lower(value: string): string {
  return Case.lower(value);
}

/** Convert a string to upper case */
export function upper(value: string): string {
  return Case.upper(value);
}

/** Convert a string to compact case */
export function compact(value: string): string {
  return Case.snake(value).replace(/_/g, '');
}

/** Convert a string to pascal case */
export function pascal(value: string): string {
  return Case.pascal(value);
}

/** Convert a string to camel case */
export function camel(value: string): string {
  return Case.camel(value);
}

/** Convert a string to title case */
export function title(value: string): string {
  return Case.title(value);
}

/** Convert a string to sentence case */
export function sentence(value: string): string {
  return Case.sentence(value);
}

/** Convert a string to camel case, pascal case, etc... */
export function stringVariants(value: string): StringVariations {
  return {
    raw: value,
    kebab: kebab(value),
    snake: snake(value),
    header: header(value),
    constant: constant(value),
    big: big(value),
    capital: capital(value),
    lower: lower(value),
    upper: upper(value),
    compact: compact(value),
    pascal: pascal(value),
    camel: camel(value),
    title: title(value),
    sentence: sentence(value),
    toString(): string {
      return this.raw;
    },
  };
}
