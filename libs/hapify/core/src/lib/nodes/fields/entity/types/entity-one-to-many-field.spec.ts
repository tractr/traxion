import { Model } from '../../../model';
import { EntityOneToManyField } from './entity-one-to-many-field';

describe('EntityOneToManyField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new EntityOneToManyField('test', new Model('User'));
      expect(field).toBeInstanceOf(EntityOneToManyField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new EntityOneToManyField('test', new Model('User'));
      expect(field.type).toBe('entity');
      expect(field.subType).toBe('oneToMany');
    });
  });
});
