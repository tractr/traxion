import { PrismaScalarFieldType } from '../interfaces';

export function isPrismaNumberType(
  type: PrismaScalarFieldType,
): type is 'BigInt' | 'Decimal' | 'Float' | 'Int' {
  return (
    type === 'BigInt' ||
    type === 'Decimal' ||
    type === 'Float' ||
    type === 'Int'
  );
}
