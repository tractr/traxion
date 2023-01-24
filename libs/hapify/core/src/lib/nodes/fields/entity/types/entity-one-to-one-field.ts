import { BaseEntityField } from '../base-entity-field';

export class EntityOneToOneField extends BaseEntityField {
  readonly type = 'entity' as const;
  readonly subType = 'oneToOne' as const;
}
