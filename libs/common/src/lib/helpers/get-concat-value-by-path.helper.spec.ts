import { getAllKeysByPath } from './get-concat-value-by-path.helper';

describe('getAllKeysByPath', () => {
  it('should return an array of keys', () => {
    const obj = {
      a: {
        b: [
          {
            c: {
              d: 1,
            },
          },
          {
            c: {
              d: 2,
            },
          },
          {
            c: {
              d: 3,
            },
          },
        ],
      },
    };
    const result = getAllKeysByPath('a.b.c.d', obj);
    expect(result).toEqual([1, 2, 3]);
  });
});
