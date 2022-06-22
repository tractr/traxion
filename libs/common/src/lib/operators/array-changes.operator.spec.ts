import { Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { ArrayChanges, arrayChanges } from './array-changes.operator';

function createTestScheduler(expect: jest.Expect): TestScheduler {
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
  it('should emit original added value when removed', async () => {
    const subject = new Subject<{ id: number }[]>();
    const stream$ = subject.pipe(
      arrayChanges<{ id: number }>((a, b) => a.id === b.id),
    );
    let lastChanges: ArrayChanges<{ id: number }> = {
      added: [],
      removed: [],
      value: [],
    };
    const subscription = stream$.subscribe((changes) => {
      lastChanges = changes;
    });

    const originalValue = [{ id: 1 }, { id: 2 }];

    subject.next(originalValue);
    expect(lastChanges.value[0]).toBe(originalValue[0]);
    expect(lastChanges.value[1]).toBe(originalValue[1]);

    subject.next([{ id: 2 }, { id: 3 }]);
    expect(lastChanges.value[0]).toBe(originalValue[1]);
    expect(lastChanges.removed[0]).toBe(originalValue[0]);

    subscription.unsubscribe();
  });
});
