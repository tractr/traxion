import { unique } from './unique-array.helper';

describe('uniq method', () => {
  it('should return an array with unique values', () => {
    const array = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ];
    const result = unique(array);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
