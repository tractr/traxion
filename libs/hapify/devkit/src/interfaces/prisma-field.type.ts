import type { DMMF } from '@prisma/generator-helper';

// Prisma DMMF.Field type is very generic and can be narrowed down to the next types union:

/**
 * Prisma field properties that are only available for relation fields.
 */
export type PrismaFieldRelationProperty =
  | 'relationFromFields'
  | 'relationToFields'
  | 'relationName'
  | 'relationOnDelete';

export type PrismaNonRelationalField = {
  [key in PrismaFieldRelationProperty]: undefined;
};

export type PrismaRelationalField = Required<
  Pick<DMMF.Field, PrismaFieldRelationProperty>
>;
/**
 * Prisma field types that are only available for scalar fields.
 */
export type PrismaScalarFieldType =
  | 'BigInt'
  | 'Boolean'
  | 'Bytes'
  | 'DateTime'
  | 'Decimal'
  | 'Float'
  | 'Int'
  | 'Json'
  | 'String';

/**
 * Prisma scalar field.
 */
export type PrismaScalarField = DMMF.Field &
  PrismaNonRelationalField & {
    kind: 'scalar';
    type: PrismaScalarFieldType;
  };

/**
 * Prisma enum field.
 */
export type PrismaEnumField = DMMF.Field &
  PrismaNonRelationalField & {
    kind: 'enum';
    type: string;
  };

/**
 * Prisma object field (relation)
 */
export type PrismaObjectField = DMMF.Field &
  PrismaRelationalField & {
    kind: 'object';
    type: string;
  };

/**
 * Prisma field expressed as a discriminated union.
 */
export type PrismaField =
  | PrismaScalarField
  | PrismaEnumField
  | PrismaObjectField;
