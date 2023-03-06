import { PrismaScalarFieldType } from '../interfaces';

export function isPrismaStringType(
  type: PrismaScalarFieldType,
): type is 'String' {
  return type === 'String';
}
