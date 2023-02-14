import { FieldProperties } from './common.type';

export type RelationField = Node &
  FieldProperties & {
    type: 'relation';
  };
