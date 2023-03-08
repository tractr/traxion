import { resolveDynamicPath } from './dynamic-path-resolver';

describe('DynamicPathResolver', () => {
  it('should return the path if it is absolute', () => {
    const dynamicPath = '/path/to/file';
    const localPath = '../local/path';

    const result = resolveDynamicPath(dynamicPath, localPath);

    expect(result).toEqual(dynamicPath);
  });

  it('should resolve the path if it is relative', () => {
    const dynamicPath = './path/to/file';
    const localPath = '../local/path';

    const result = resolveDynamicPath(dynamicPath, localPath);

    expect(result).toEqual('../local/path/path/to/file');
  });
});
