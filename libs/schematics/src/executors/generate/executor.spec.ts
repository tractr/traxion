import { execAsync } from '../../helpers/exec-async';
import executor from './executor';
import { GenerateExecutorSchema } from './schema';

jest.mock('../../helpers/exec-async');

describe('Generate executor:generate', () => {
  let execAsyncSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    execAsyncSpy = execAsync as jest.MockedFunction<typeof execAsync>;
  });

  // it('executor should return the good options parameters and have called 7 commands', async () => {
  //   const options: GenerateExecutorSchema = {
  //     cwd: 'libs/generated',
  //     format: true,
  //     outputPath: 'src/lib/generated',
  //     pathToLib: 'dist/libs/hapify',
  //     sourcePath: 'generated',
  //   };

  //   const output = await executor(options);

  //   expect(output).toEqual({ ...options, success: true });

  //   expect(execAsyncSpy).toHaveBeenCalledTimes(7);

  //   execAsyncSpy.mock.calls.forEach((call) => {
  //     expect(call[0]).toEqual(expect.any(String));
  //   });
  // });

  // it('executor should return the good options parameters and have called 6 commands', async () => {
  //   const options: GenerateExecutorSchema = {
  //     cwd: 'libs/generated',
  //     format: false,
  //     outputPath: 'src/lib/generated',
  //     pathToLib: 'dist/libs/hapify',
  //     sourcePath: 'generated',
  //   };

  //   const output = await executor(options);

  //   expect(output).toEqual({ ...options, success: true });

  //   expect(execAsyncSpy).toHaveBeenCalledTimes(6);

  //   execAsyncSpy.mock.calls.forEach((call) => {
  //     expect(call[0]).toEqual(expect.any(String));
  //   });
  // });

  // it('executor should return the good options parameters and have called 4 commands', async () => {
  //   const options: GenerateExecutorSchema = {
  //     cwd: 'libs/generated',
  //     format: false,
  //     pathToLib: 'dist/libs/hapify',
  //   };

  //   const output = await executor(options);

  //   expect(output).toEqual({ ...options, success: true });

  //   expect(execAsyncSpy).toHaveBeenCalledTimes(4);

  //   execAsyncSpy.mock.calls.forEach((call) => {
  //     expect(call[0]).toEqual(expect.any(String));
  //   });
  // });
});
