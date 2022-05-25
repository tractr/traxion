import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: unknown): Date {
    if (typeof value === 'string') return new Date(value);
    throw new Error('Custom Scalar Date can only parse dates');
  }

  serialize(value: unknown): string {
    if (value instanceof Date) return value.toISOString();
    throw new Error('Custom Scalar Date can only parse dates');
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new Error('Custom Scalar Date can only parse dates');
  }
}
