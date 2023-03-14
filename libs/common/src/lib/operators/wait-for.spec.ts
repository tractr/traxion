import { TestScheduler } from 'rxjs/testing';

import { waitFor } from './wait-for';

function createTestScheduler(expect: jest.Expect): TestScheduler {
  return new TestScheduler((actual: unknown, expected: unknown) => {
    expect(actual).toEqual(expected);
  });
}

describe('waitFor', () => {
  it('should buffer values and send them once triggered', () => {
    createTestScheduler(expect).run(({ cold, expectObservable }) => {
      // Creates marbles
      const inputMarble = '   -a-b----c-d-|';
      const triggerMarble = ' ----a----b--|';
      const outputMarble = '  ----(ab)c-d-|';

      // Creates input stream
      const stream$ = cold(inputMarble, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
      const trigger$ = cold(triggerMarble, {
        a: 1,
        b: 2,
      });
      const pipedStream$ = stream$.pipe(waitFor(trigger$));

      // Tests output
      expectObservable(pipedStream$).toBe(outputMarble, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
    });
  });
  it('should buffer values and send only 1', () => {
    createTestScheduler(expect).run(({ cold, expectObservable }) => {
      // Creates marbles
      const inputMarble = '   -a-b----c-d-|';
      const triggerMarble = ' ----a----b--|';
      const outputMarble = '  ----b---c-d-|';

      // Creates input stream
      const stream$ = cold(inputMarble, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
      const trigger$ = cold(triggerMarble, {
        a: 1,
        b: 2,
      });
      const pipedStream$ = stream$.pipe(waitFor(trigger$, 1));

      // Tests output
      expectObservable(pipedStream$).toBe(outputMarble, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
    });
  });
  it('should buffer values and send all value if limit is high', () => {
    createTestScheduler(expect).run(({ cold, expectObservable }) => {
      // Creates marbles
      const inputMarble = '   -a-b----c-d-|';
      const triggerMarble = ' ----a----b--|';
      const outputMarble = '  ----(ab)c-d-|';

      // Creates input stream
      const stream$ = cold(inputMarble, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
      const trigger$ = cold(triggerMarble, {
        a: 1,
        b: 2,
      });
      const pipedStream$ = stream$.pipe(waitFor(trigger$, 100));

      // Tests output
      expectObservable(pipedStream$).toBe(outputMarble, {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
    });
  });
});
