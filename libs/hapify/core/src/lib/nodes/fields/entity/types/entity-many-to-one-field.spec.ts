import { Model } from '../../../model';
import { EntityManyToOneField } from './entity-many-to-one-field';
import { EntityMultipleField } from './entity-multiple-field';

describe('EntityMultipleField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new EntityManyToOneField('test', new Model('User'));
      expect(field).toBeInstanceOf(EntityMultipleField);
    });
  });
  describe('limit', () => {
    it('should be undefined by default', () => {
      const field = new EntityManyToOneField('test', new Model('User'));
      expect(field.limit).toBeUndefined();
    });
    it('should set the limit', () => {
      const field = new EntityManyToOneField('test', new Model('User'));
      expect(field.setLimit(10)).toBe(field); // Test chaining;
      expect(field.limit).toBe(10);
    });
  });
});

describe('EntityManyToOneField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new EntityManyToOneField('test', new Model('User'));
      expect(field).toBeInstanceOf(EntityManyToOneField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new EntityManyToOneField('test', new Model('User'));
      expect(field.type).toBe('entity');
      expect(field.subType).toBe('manyToOne');
    });
  });
});
