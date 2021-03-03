import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getParamDecoratorFactory(decorator: Function): Function {
  class Test {
    public test(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      @decorator() value: unknown, // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
