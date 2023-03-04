import { ScalarType } from '../field';

export function getScalarFromType(type: string): ScalarType | null {
  if (['string', 'number', 'boolean', 'object', 'date'].includes(type)) {
    return type as ScalarType;
  }
  if (type === 'file') return 'string';

  return null;
}
