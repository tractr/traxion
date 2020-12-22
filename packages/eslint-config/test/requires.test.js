/* eslint strict: 0, global-require: 0 */

'use strict';

test('all entry points parse', () => {
  expect(() => require('..')).not.toThrow();
});
