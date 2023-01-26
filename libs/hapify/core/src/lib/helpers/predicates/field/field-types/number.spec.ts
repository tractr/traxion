import {
  NumberBasicField,
  NumberFloatField,
  NumberIntegerField,
  NumberLatitudeField,
  NumberLongitudeField,
  StringBasicField,
} from '../../../../nodes';
import {
  isBasicNumber,
  isFloat,
  isInteger,
  isLatitude,
  isLongitude,
  isNumber,
} from './number';

describe('isBasicNumber', () => {
  it('should return true', () => {
    expect(isBasicNumber(new NumberBasicField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isBasicNumber(new NumberFloatField('test'))).toBe(false);
  });
});

describe('isFloat', () => {
  it('should return true', () => {
    expect(isFloat(new NumberFloatField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isFloat(new NumberBasicField('test'))).toBe(false);
  });
});

describe('isInteger', () => {
  it('should return true', () => {
    expect(isInteger(new NumberIntegerField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isInteger(new NumberBasicField('test'))).toBe(false);
  });
});

describe('isLatitude', () => {
  it('should return true', () => {
    expect(isLatitude(new NumberLatitudeField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isLatitude(new NumberBasicField('test'))).toBe(false);
  });
});

describe('isLongitude', () => {
  it('should return true', () => {
    expect(isLongitude(new NumberLongitudeField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isLongitude(new NumberBasicField('test'))).toBe(false);
  });
});

describe('isNumber', () => {
  it('should return true', () => {
    expect(isNumber(new NumberBasicField('test'))).toBe(true);
    expect(isNumber(new NumberFloatField('test'))).toBe(true);
    expect(isNumber(new NumberIntegerField('test'))).toBe(true);
    expect(isNumber(new NumberLatitudeField('test'))).toBe(true);
    expect(isNumber(new NumberLongitudeField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isNumber(new StringBasicField('test'))).toBe(false);
  });
});
