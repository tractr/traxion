/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@nestjs/common';

export function isClass<T = Type>(obj: any): obj is T {
  const isCtorClass = obj?.constructor?.toString().substring(0, 5) === 'class';

  if (obj?.prototype === undefined) {
    return !!isCtorClass;
  }

  const isPrototypeCtorClass =
    obj.prototype.constructor.toString().substring(0, 5) === 'class';
  return !!isCtorClass || !!isPrototypeCtorClass;
}
