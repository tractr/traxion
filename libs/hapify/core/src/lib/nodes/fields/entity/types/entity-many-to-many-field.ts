import { EntityMultipleField } from './entity-multiple-field';

export class EntityManyToManyField extends EntityMultipleField {
  readonly type = 'entity' as const;
  readonly subType = 'manyToMany' as const;
}
