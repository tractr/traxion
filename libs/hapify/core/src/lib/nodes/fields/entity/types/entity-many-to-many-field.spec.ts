import { Model } from '../../../model';
import { EntityManyToManyField } from './entity-many-to-many-field';

describe('EntityManyToManyField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new EntityManyToManyField('test', new Model('User'));
      expect(field).toBeInstanceOf(EntityManyToManyField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new EntityManyToManyField('test', new Model('User'));
      expect(field.type).toBe('entity');
      expect(field.subType).toBe('manyToMany');
    });
  });
});
