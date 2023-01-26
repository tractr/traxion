import {
  NumberBasicField,
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringRichField,
  StringTextField,
  StringUrlField,
} from '../../../../nodes';
import {
  isBasicString,
  isEmail,
  isPassword,
  isRich,
  isString,
  isText,
  isUrl,
} from './string';

describe('isBasicString', () => {
  it('should return true', () => {
    expect(isBasicString(new StringBasicField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isBasicString(new StringEmailField('test'))).toBe(false);
  });
});

describe('isEmail', () => {
  it('should return true', () => {
    expect(isEmail(new StringEmailField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isEmail(new StringBasicField('test'))).toBe(false);
  });
});

describe('isPassword', () => {
  it('should return true', () => {
    expect(isPassword(new StringPasswordField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isPassword(new StringBasicField('test'))).toBe(false);
  });
});

describe('isRich', () => {
  it('should return true', () => {
    expect(isRich(new StringRichField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isRich(new StringEmailField('test'))).toBe(false);
  });
});

describe('isText', () => {
  it('should return true', () => {
    expect(isText(new StringTextField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isText(new StringEmailField('test'))).toBe(false);
  });
});

describe('isUrl', () => {
  it('should return true', () => {
    expect(isUrl(new StringUrlField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isUrl(new StringBasicField('test'))).toBe(false);
  });
});

describe('isString', () => {
  it('should return true', () => {
    expect(isString(new StringBasicField('test'))).toBe(true);
    expect(isString(new StringEmailField('test'))).toBe(true);
    expect(isString(new StringPasswordField('test'))).toBe(true);
    expect(isString(new StringRichField('test'))).toBe(true);
    expect(isString(new StringTextField('test'))).toBe(true);
    expect(isString(new StringUrlField('test'))).toBe(true);
  });

  it('should return false', () => {
    expect(isString(new NumberBasicField('test'))).toBe(false);
  });
});
