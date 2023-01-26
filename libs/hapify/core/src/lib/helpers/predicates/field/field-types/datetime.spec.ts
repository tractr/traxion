import { DateField, StringBasicField, TimeField } from '../../../../nodes';
import { isDate, isTime } from './datetime';

describe('isDate', () => {
  it('should return true', () => {
    expect(isDate(new DateField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isDate(new StringBasicField('test'))).toBe(false);
  });
});

describe('isTime', () => {
  it('should return true', () => {
    expect(isTime(new TimeField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isTime(new StringBasicField('test'))).toBe(false);
  });
});
