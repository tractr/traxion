import { JwtService } from '@nestjs/jwt';

export function mockJwtServiceFactory(): JwtService {
  return ({
    sign: jest.fn(() => ''),
  } as unknown) as JwtService;
}
