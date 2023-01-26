import { StringBasicField } from '../../../nodes';
import {
  isLabel,
  isMultiple,
  isNullable,
  isPrimary,
  isSearchable,
  isSortable,
  isUnique,
} from './field-properties';

describe('isPrimary', () => {
  it('should return true if the field is primary', () => {
    const field = new StringBasicField('test');
    field.setPrimary(true);
    expect(isPrimary(field)).toBe(true);
  });
  it('should return false if the field is not primary', () => {
    const field = new StringBasicField('test');
    field.setPrimary(false);
    expect(isPrimary(field)).toBe(false);
  });
});

describe('isUnique', () => {
  it('should return true if the field is unique', () => {
    const field = new StringBasicField('test');
    field.setUnique(true);
    expect(isUnique(field)).toBe(true);
  });
  it('should return false if the field is not unique', () => {
    const field = new StringBasicField('test');
    field.setUnique(false);
    expect(isUnique(field)).toBe(false);
  });
});

describe('isLabel', () => {
  it('should return true if the field is label', () => {
    const field = new StringBasicField('test');
    field.setLabel(true);
    expect(isLabel(field)).toBe(true);
  });
  it('should return false if the field is not label', () => {
    const field = new StringBasicField('test');
    field.setLabel(false);
    expect(isLabel(field)).toBe(false);
  });
});

describe('isNullable', () => {
  it('should return true if the field is nullable', () => {
    const field = new StringBasicField('test');
    field.setNullable(true);
    expect(isNullable(field)).toBe(true);
  });
  it('should return false if the field is not nullable', () => {
    const field = new StringBasicField('test');
    field.setNullable(false);
    expect(isNullable(field)).toBe(false);
  });
});

describe('isMultiple', () => {
  it('should return true if the field is multiple', () => {
    const field = new StringBasicField('test');
    field.setMultiple(true);
    expect(isMultiple(field)).toBe(true);
  });
  it('should return false if the field is not multiple', () => {
    const field = new StringBasicField('test');
    field.setMultiple(false);
    expect(isMultiple(field)).toBe(false);
  });
});

describe('isSearchable', () => {
  it('should return true if the field is searchable', () => {
    const field = new StringBasicField('test');
    field.setSearchable(true);
    expect(isSearchable(field)).toBe(true);
  });
  it('should return false if the field is not searchable', () => {
    const field = new StringBasicField('test');
    field.setSearchable(false);
    expect(isSearchable(field)).toBe(false);
  });
});

describe('isSortable', () => {
  it('should return true if the field is sortable', () => {
    const field = new StringBasicField('test');
    field.setSortable(true);
    expect(isSortable(field)).toBe(true);
  });
  it('should return false if the field is not sortable', () => {
    const field = new StringBasicField('test');
    field.setSortable(false);
    expect(isSortable(field)).toBe(false);
  });
});
