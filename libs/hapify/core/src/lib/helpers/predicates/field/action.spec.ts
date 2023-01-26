import { StringBasicField } from '../../../nodes';
import {
  isFieldActionAuth,
  isFieldActionEmpty,
  isFieldActionPublic,
  isFieldActionSystem,
} from './action';

describe('isFieldActionPublic', () => {
  it('should return true if the action scope is public', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'public');
    expect(isFieldActionPublic('write')(field)).toBe(true);
  });
  it('should return false if the action scope is not public', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'auth');
    expect(isFieldActionPublic('write')(field)).toBe(false);
  });
});

describe('isFieldActionAuth', () => {
  it('should return true if the action scope is auth', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'auth');
    expect(isFieldActionAuth('write')(field)).toBe(true);
  });
  it('should return false if the action scope is not auth', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'system');
    expect(isFieldActionAuth('write')(field)).toBe(false);
  });
});

describe('isFieldActionSystem', () => {
  it('should return true if the action scope is system', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'system');
    expect(isFieldActionSystem('write')(field)).toBe(true);
  });
  it('should return false if the action scope is not system', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'auth');
    expect(isFieldActionSystem('write')(field)).toBe(false);
  });
});

describe('isFieldActionEmpty', () => {
  it('should return true if the action scope is empty', () => {
    const field = new StringBasicField('name');
    expect(isFieldActionEmpty('write')(field)).toBe(true);
  });
  it('should return false if the action scope is not empty', () => {
    const field = new StringBasicField('name');
    field.setActionScope('write', 'auth');
    expect(isFieldActionEmpty('write')(field)).toBe(false);
  });
});
