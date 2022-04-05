import { TestScheduler } from 'rxjs/testing';

import { arrayChanges } from './array-changes.operator';


function createTestScheduler(expect: any): TestScheduler {
  return new TestScheduler((actual: unknown, expected: unknown) => {
    expect(actual).toEqual(expected);
  });
}

describe('arrayChanges', () => {
  it('test operator with defined values', () => {
    createTestScheduler(expect).run(({ cold, expectObservable }) => {
      // Creates marbles
      const inputMarble = ' -a-b-c-d-|';
      const outputMarble = '-a-b---d-|';

      // Creates input stream
      const stream$ = cold(inputMarble, {
        a: [1, 2, 3],
        b: [2, 3, '4', 5],
        c: [2, 3, '4', 5],
        d: [],
      });
      const pipedStream$ = stream$.pipe(arrayChanges<number | string>());

      // Tests output
      expectObservable(pipedStream$).toBe(outputMarble, {
        a: {
          added: [1, 2, 3],
          removed: [],
          value: [1, 2, 3],
        },
        b: {
          added: ['4', 5],
          removed: [1],
          value: [2, 3, '4', 5],
        },
        d: {
          added: [],
          removed: [2, 3, '4', 5],
          value: [],
        },
      });
    });
  });
});
