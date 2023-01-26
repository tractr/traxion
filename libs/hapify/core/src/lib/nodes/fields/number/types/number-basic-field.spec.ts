import { BaseNumberField } from '../base-number-field';
import { NumberBasicField } from './number-basic-field';

describe('BaseNumberField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new NumberBasicField('test');
      expect(field).toBeInstanceOf(BaseNumberField);
    });
  });

  describe('min', () => {
    it('should be undefined by default', () => {
      const field = new NumberBasicField('test');
      expect(field.min).toBeUndefined();
    });
    it('should be set', () => {
      const field = new NumberBasicField('test');
      field.setMin(1);
      expect(field.min).toBe(1);
    });
  });

  describe('max', () => {
    it('should be undefined by default', () => {
      const field = new NumberBasicField('test');
      expect(field.max).toBeUndefined();
    });
    it('should be set', () => {
      const field = new NumberBasicField('test');
      field.setMax(1);
      expect(field.max).toBe(1);
    });
  });

  describe('step', () => {
    it('should be undefined by default', () => {
      const field = new NumberBasicField('test');
      expect(field.step).toBeUndefined();
    });
    it('should be set', () => {
      const field = new NumberBasicField('test');
      field.setStep(1);
      expect(field.step).toBe(1);
    });
  });

  describe('defaultValue', () => {
    it('should be undefined by default', () => {
      const field = new NumberBasicField('test');
      expect(field.defaultValue).toBeUndefined();
    });
    it('should be set', () => {
      const field = new NumberBasicField('test');
      field.setDefaultValue(1);
      expect(field.defaultValue).toBe(1);
    });
  });
});

describe('NumberBasicField', () => {
  describe('constructor', () => {
    it('should create a field', () => {
      const field = new NumberBasicField('test');
      expect(field).toBeInstanceOf(NumberBasicField);
    });
  });
  describe('type', () => {
    it('should have the correct type and subType', () => {
      const field = new NumberBasicField('test');
      expect(field.type).toBe('number');
      expect(field.subType).toBe('basic');
    });
  });
});
