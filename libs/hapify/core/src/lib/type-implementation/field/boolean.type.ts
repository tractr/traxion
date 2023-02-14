import { Node } from '../node';
import { FieldProperties } from './common.type';

export type BooleanField = Node &
  FieldProperties & {
    type: 'boolean';
  };
