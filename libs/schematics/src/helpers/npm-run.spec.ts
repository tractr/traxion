import { exec } from 'child_process';

import { npmRun } from './npm-run';

jest.mock('child_process');

describe('npmRun', () => {
  const mockExec = exec as jest.MockedFunction<typeof exec>;

  it('should call exec with npm run arguments', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockExec.mockImplementation((_, callback: any) =>
      callback(null, { stdout: 'ok' }),
    );

    await npmRun('format');

    expect(mockExec).toHaveBeenCalledTimes(1);
    expect(mockExec).toHaveBeenCalledWith(
      'npm run format',
      expect.any(Function),
    );
  });
});
