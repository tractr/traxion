import { BaseField } from '../base-field';

/**
 * This class is tested via the children classes, especially the NumberBasicField class
 */
export abstract class BaseNumberField extends BaseField {
  type = 'number';
}
