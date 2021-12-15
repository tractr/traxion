import executor from './executor';
import { GenerateExecutorSchema } from './schema';

describe('Generate executor:generate', () => {
  it('should return the good options parameters', async () => {
    const options: GenerateExecutorSchema = {
      path: 'pathTest',
      projectName: 'projectNameTest',
    };

    const output = await executor(options);
    expect(output).toBe({ ...options, success: true });
  });
});
