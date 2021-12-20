import {
  findAllValueByPath,
  getConcatValueByPath,
} from './get-concat-value-by-path.helper';

describe('findAllValueByPath', () => {
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
    const result = findAllValueByPath('a.b.c.d', obj);
    expect(result).toEqual([1, 2, 3]);
  });
  it('should work with an array', () => {
    const obj = [
      {
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
      },
    ];
    const result = findAllValueByPath('a.b.c.d', obj);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should not throw if the path is not found', () => {
    const obj = [
      {
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
      },
    ];
    const result = findAllValueByPath('b.c.d', obj);
    expect(result).toEqual([]);

    const obj2 = 'foo';
    const result2 = findAllValueByPath('b.c.d', obj2);
    expect(result2).toEqual([]);
  });

  it('should return the value if the path is empty', () => {
    const obj = 'foo';
    const result = findAllValueByPath('', obj);
    expect(result).toEqual([obj]);
  });
  it('should return an empty array if the current obj is undefined', () => {
    const result = findAllValueByPath('', undefined);
    expect(result).toEqual([]);
  });
  it('getConcatValueByPath should be an alias with type of findAllValueByPath', () => {
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
    const result = findAllValueByPath('a.b.c.d', obj);
    const result2 = getConcatValueByPath('a.b.c.d', obj);
    expect(result).toEqual(result2);
  });
});
