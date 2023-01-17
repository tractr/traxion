import { EntityMultipleField } from './entity-multiple-field';

export class EntityManyToOneField extends EntityMultipleField {
  readonly type = 'entity' as const;
  readonly subType = 'manyToOne' as const;
}
