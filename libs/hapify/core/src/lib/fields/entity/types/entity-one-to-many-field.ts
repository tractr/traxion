import { EntityMultipleField } from './entity-multiple-field';

export class EntityOneToManyField extends EntityMultipleField {
  readonly type = 'entity' as const;
  readonly subType = 'oneToMany' as const;
}
