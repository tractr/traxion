import { execAsync } from '../../helpers/exec-async';
import executor from './executor';
import { GenerateExecutorSchema } from './schema';

jest.mock('../../helpers/async-exec');

describe('Generate executor:generate', () => {
  it('executor should return the good options parameters and have called 5 commands', async () => {
    const execAsyncSpy: jest.SpyInstance = execAsync as jest.MockedFunction<
      typeof execAsync
    >;

    const options: GenerateExecutorSchema = {
      path: 'libs/generated',
      projectName: '',
    };

    const output = await executor(options);

    expect(output).toEqual({ ...options, success: true });

    expect(execAsyncSpy).toHaveBeenCalledTimes(6);

    execAsyncSpy.mock.calls.forEach((call) => {
      expect(call[0]).toEqual(expect.any(String));
      expect(call[1]).toHaveProperty('cwd');
    });
  });
});
