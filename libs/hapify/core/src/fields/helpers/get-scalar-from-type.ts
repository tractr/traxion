import { FieldType, ScalarType } from '../field';

export function getScalarFromType(type: FieldType): ScalarType | null {
  switch (type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'object':
    case 'date':
      return type;
    // TODO: validate the mapping between type and scalar
    case 'enum':
    case 'file':
    case 'foreign':
    case 'primary':
      return 'string';
    case 'virtual':
      return 'object';
    default:
      return null;
  }
}
