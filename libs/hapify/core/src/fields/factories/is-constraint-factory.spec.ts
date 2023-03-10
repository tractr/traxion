import { isConstraintFactory } from './is-constraint-factory';

describe('isConstraintFactory', () => {
  it('should accept any constraint name', () => {
    const field = {
      type: 'number',
      name: 'Age',
      pluralName: 'Ages',
      minValue: 0,
      maxValue: 1,
    };
    const isMinValue = isConstraintFactory('minValue');
    const isMaxValue = isConstraintFactory('maxValue');

    expect(isMinValue(field)).not.toBeTruthy();
    expect(isMaxValue(field)).toBeTruthy();
  });

  it('should return true if the field is truthy', () => {
    const field = {
      type: 'number',
      name: 'Age',
      pluralName: 'Ages',
      isEncrypted: true,
    };
    const isEncrypted = isConstraintFactory('isEncrypted');

    expect(isEncrypted(field)).toBeTruthy();
  });

  it('should return false if the field is not truthy', () => {
    const field = {
      type: 'number',
      name: 'Age',
      pluralName: 'Ages',
      isEncrypted: false,
    };
    const isEncrypted = isConstraintFactory('isEncrypted');

    expect(isEncrypted(field)).not.toBeTruthy();
  });
});
