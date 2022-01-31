import { ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { mockDeep, mockReset } from 'jest-mock-extended';

import { getRequestFromContext } from './context.helper';

// Mock GqlExecutionContext
// jest.mock('@nestjs/graphql');

describe('Context helpers', () => {
  const mockedContext = mockDeep<ExecutionContext>();

  afterEach(() => {
    mockReset(mockedContext);
  });

  describe('getRequestFromContext', () => {
    it('should return the http request object in http context', () => {
      const mockedRequest = { request: 'request' };
      const mockedHttpArgumentHost = mockDeep<HttpArgumentsHost>();
      mockedHttpArgumentHost.getRequest.mockReturnValueOnce(mockedRequest);

      mockedContext.getType.mockReturnValueOnce('http');
      mockedContext.switchToHttp.mockReturnValueOnce(mockedHttpArgumentHost);

      const result = getRequestFromContext(mockedContext);

      expect(result).toBe(mockedRequest);
    });

    it('should return the graphql request object in graphql context', () => {
      // mockedGqlExecutionContext.create();
      const mockedRequest = 'request';
      mockedContext.getType.mockReturnValue('graphql');
      mockedContext.getArgs.mockReturnValue([
        {},
        {},
        { req: mockedRequest },
        {},
      ]);

      const result = getRequestFromContext(mockedContext);

      expect(result).toBe(mockedRequest);
    });

    it('should fail when the context is not handled', () => {
      mockedContext.getType.mockReturnValueOnce('not-handled');

      expect(() => getRequestFromContext(mockedContext)).toThrow(
        'Context type not-handled is not handled',
      );
    });
  });
});
