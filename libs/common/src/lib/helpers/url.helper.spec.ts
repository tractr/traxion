import { formatQueryParameters, getUrl } from './url.helper';

describe('Url helpers', () => {
  describe('formateQueryParameters', () => {
    it('should stringify items in arrays', () => {
      const queryParams = {
        array: ['10', 10, false, { test: 'test' }],
      };

      const expectedResult =
        'array[]=10&array[]=10&array[]=false&array[]=%7B%22test%22%3A%22test%22%7D';

      const result = formatQueryParameters(queryParams);

      expect(result).toEqual(expectedResult);
    });

    it('should stringify dates', () => {
      const date = new Date('August 19, 1975 23:15:30 GMT-3:00');

      const queryParams = {
        date,
      };

      const expectedResult = 'date=1975-08-20T02%3A15%3A30.000Z';
      const result = formatQueryParameters(queryParams);

      expect(result).toEqual(expectedResult);
    });

    it('should stringify objects', () => {
      const queryParams = {
        object: { test: 'foo' },
      };

      const expectedResult = 'object=%7B%22test%22%3A%22foo%22%7D';

      const result = formatQueryParameters(queryParams);

      expect(result).toEqual(expectedResult);
    });

    it('should ignore  empty strings and undefined values and keep null', () => {
      const queryParams = {
        emptyString: '',
        nonDefined: undefined,
        nullish: null,
      };

      const expectedResult = 'nullish=null';

      const result = formatQueryParameters(queryParams);

      expect(result).toEqual(expectedResult);
    });

    it('should return valid queryParams', () => {
      const date = new Date('August 19, 1975 23:15:30 GMT-3:00');

      const queryParams = {
        nonDefined: undefined,
        nullish: null,
        array: ['item1', 'item2'],
        boolean: true,
        date,
        number: 100,
        object: { test: 'foo' },
        objectArray: [{ test1: 'foo' }, { test2: 'foo' }],
        string: 'string',
      };

      const expectedResult =
        'array[]=item1&array[]=item2&boolean=true&date=1975-08-20T02%3A15%3A30.000Z&nullish=null&number=100&object=%7B%22test%22%3A%22foo%22%7D&objectArray[]=%7B%22test1%22%3A%22foo%22%7D&objectArray[]=%7B%22test2%22%3A%22foo%22%7D&string=string';

      const result = formatQueryParameters(queryParams);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getUrl', () => {
    it('should build a correct url', () => {
      const baseUrl = new URL('https://base.com');
      const parameters = '/users';

      const date = new Date('August 19, 1975 23:15:30 GMT-3:00');
      const queryParams = {
        nonDefined: undefined,
        nullish: null,
        array: ['item1', 'item2'],
        boolean: true,
        date,
        number: 100,
        object: { test: 'foo' },
        objectArray: [{ test1: 'foo' }, { test2: 'foo' }],
        string: 'string',
      };

      const expectedResult =
        'https://base.com/users?array[]=item1&array[]=item2&boolean=true&date=1975-08-20T02%3A15%3A30.000Z&nullish=null&number=100&object=%7B%22test%22%3A%22foo%22%7D&objectArray[]=%7B%22test1%22%3A%22foo%22%7D&objectArray[]=%7B%22test2%22%3A%22foo%22%7D&string=string';

      const result = getUrl(baseUrl, parameters, queryParams).toString();

      expect(result).toBe(expectedResult);
    });
  });
});
