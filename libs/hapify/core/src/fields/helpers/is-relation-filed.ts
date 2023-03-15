import { or } from '../../operators';
import { isForeignField } from '../foreign-field';
import { isPrimaryField } from '../primary-field';
import { isVirtualField } from '../virtual-field';

export const isRelationField = or(
  isPrimaryField,
  isVirtualField,
  isForeignField,
);
