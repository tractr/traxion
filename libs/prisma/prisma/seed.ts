import { seed } from '../src/index';

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start the server. See the error below.');
  // eslint-disable-next-line no-console
  console.error(e);
});
