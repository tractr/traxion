import * as deepmerge from 'deepmerge';
import { isPlainObject } from 'is-plain-object';

export function mergeConfigurations<
  C extends Partial<unknown>,
  D extends Partial<unknown>,
>(defaultConfig: D, config: C): C & D {
  return deepmerge(defaultConfig, config, {
    isMergeableObject: isPlainObject,
  }) as C & D;
}
