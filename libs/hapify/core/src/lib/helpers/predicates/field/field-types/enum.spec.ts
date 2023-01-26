import { EnumField, StringBasicField } from '../../../../nodes';
import { isEnum } from './enum';

describe('isEnum', () => {
  it('should return true', () => {
    expect(isEnum(new EnumField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isEnum(new StringBasicField('test'))).toBe(false);
  });
});
