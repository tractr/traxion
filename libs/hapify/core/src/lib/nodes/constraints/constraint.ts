/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Field } from '../fields';

export abstract class Constraint<T = any> {
  abstract name: string;

  canBeUsedWith(field: Field): boolean {
    return true;
  }
}
