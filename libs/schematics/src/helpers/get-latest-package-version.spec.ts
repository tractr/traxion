import fetch, { Response } from 'node-fetch';

import { getLatestPackageVersion } from './get-latest-package-version';

jest.mock('node-fetch');

describe('getLatestPackageVersion', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  const npmRegistry = 'https://registry.npmjs.org';

  it('should throw an error if we try to use a wrong registry', async () => {
    await expect(getLatestPackageVersion('test', 'test')).rejects.toThrow(
      `Only npm (${npmRegistry}) is supported to get the latest version of a package`,
    );

    expect(mockFetch).toHaveBeenCalledTimes(0);
  });

  it('should extract the latest version of a package from the fetch response', async () => {
    mockFetch.mockReturnValue(
      Promise.resolve({
        json: async () => ({
          'dist-tags': {
            latest: '1.1.1',
          },
        }),
      }) as Promise<Response>,
    );

    await expect(getLatestPackageVersion('test', npmRegistry)).resolves.toEqual(
      '1.1.1',
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await expect(getLatestPackageVersion('test')).resolves.toEqual('1.1.1');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
