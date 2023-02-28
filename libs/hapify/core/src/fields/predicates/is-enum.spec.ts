import { isEnum } from './is-enum';

describe('isEnum', () => {
  it('should return true for a valid enum type', () => {
    const validEnumType = {
      TEST_VALUE_1: 'value 1',
      TEST_VALUE_2: 2,
    };
    expect(isEnum(validEnumType)).toBeTruthy();
  });

  it('should return false for a non-Enum Type value', () => {
    const invalidEnumType = {
      TEST_VALUE_3: 3.5,
      TEST_VALUE_4: false,
    };
    expect(isEnum(invalidEnumType)).toBeFalsy();
  });
});
