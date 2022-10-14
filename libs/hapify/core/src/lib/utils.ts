import * as Case from 'case';

import { StringVariations } from './interfaces';

/** Convert a string to camel case, pascal case, etc... */
export function stringVariants(value: string): StringVariations {
  return {
    raw: value,
    kebab: Case.kebab(value),
    snake: Case.snake(value),
    header: Case.header(value),
    constant: Case.constant(value),
    big: Case.constant(value).replace(/_/g, '-'),
    capital: Case.capital(value),
    lower: Case.lower(value),
    upper: Case.upper(value),
    compact: Case.snake(value).replace(/_/g, ''),
    pascal: Case.pascal(value),
    camel: Case.camel(value),
    toString(): string {
      return this.raw;
    },
  };
}
