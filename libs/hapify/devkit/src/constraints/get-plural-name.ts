import { DMMF } from '@prisma/generator-helper';
import { plural } from 'pluralize';

export function getPluralName(
  field: DMMF.Field,
  metadata: Record<string, unknown> = {},
): string {
  return typeof metadata.pluralName === 'string'
    ? metadata.pluralName
    : plural(field.name);
}
