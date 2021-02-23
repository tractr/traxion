// eslint-disable-next-line
export function isClass(obj: any): boolean {
  const isCtorClass =
    obj?.constructor && obj.constructor.toString().substring(0, 5) === 'class';
  if (obj.prototype === undefined) {
    return isCtorClass;
  }
  const isPrototypeCtorClass =
    obj?.prototype?.constructor?.toString().substring(0, 5) === 'class';
  return isCtorClass || isPrototypeCtorClass;
}
