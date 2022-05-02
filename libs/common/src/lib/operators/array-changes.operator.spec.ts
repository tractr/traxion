import { TestScheduler } from 'rxjs/testing';

import { arrayChanges } from './array-changes.operator';

function createTestScheduler(expect: any): TestScheduler {
  return new TestScheduler((actual: unknown, expected: unknown) => {
    expect(actual).toEqual(expected);
  });
}

describe('arrayChanges', () => {
  it('should track changes with default comparator', () => {
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
  it('should track changes by comparing object ids', () => {
    createTestScheduler(expect).run(({ cold, expectObservable }) => {
      // Creates marbles
      const inputMarble = ' -a-b-c-d-|';
      const outputMarble = '-a-b---d-|';

      // Creates input stream
      const stream$ = cold(inputMarble, {
        a: [{ id: 1 }, { id: 2 }, { id: 3 }],
        b: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        c: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        d: [],
      });
      const pipedStream$ = stream$.pipe(
        arrayChanges<{ id: number }>((a, b) => a.id === b.id),
      );

      // Tests output
      expectObservable(pipedStream$).toBe(outputMarble, {
        a: {
          added: [{ id: 1 }, { id: 2 }, { id: 3 }],
          removed: [],
          value: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
        b: {
          added: [{ id: 4 }, { id: 5 }],
          removed: [{ id: 1 }],
          value: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        },
        d: {
          added: [],
          removed: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
          value: [],
        },
      });
    });
  });
});
