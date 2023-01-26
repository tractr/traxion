import { Model } from '../../../nodes';
import {
  isModelActionAuth,
  isModelActionPublic,
  isModelActionSystem,
} from './action';

describe('isModelActionPublic', () => {
  it('should return true if the action scope is public', () => {
    const model = new Model('User');
    model.setActionScope('create', 'public');
    expect(isModelActionPublic('create')(model)).toBe(true);
  });
  it('should return false if the action scope is not public', () => {
    const model = new Model('User');
    model.setActionScope('create', 'auth');
    expect(isModelActionPublic('create')(model)).toBe(false);
  });
});

describe('isModelActionAuth', () => {
  it('should return true if the action scope is auth', () => {
    const model = new Model('User');
    model.setActionScope('create', 'auth');
    expect(isModelActionAuth('create')(model)).toBe(true);
  });
  it('should return false if the action scope is not auth', () => {
    const model = new Model('User');
    model.setActionScope('create', 'system');
    expect(isModelActionAuth('create')(model)).toBe(false);
  });
});

describe('isModelActionSystem', () => {
  it('should return true if the action scope is system', () => {
    const model = new Model('User');
    model.setActionScope('create', 'system');
    expect(isModelActionSystem('create')(model)).toBe(true);
  });
  it('should return false if the action scope is not system', () => {
    const model = new Model('User');
    model.setActionScope('create', 'auth');
    expect(isModelActionSystem('create')(model)).toBe(false);
  });
});
