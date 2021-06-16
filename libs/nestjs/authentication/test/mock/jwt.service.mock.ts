import { JwtService } from '@nestjs/jwt';

export function mockJwtServiceFactory(): JwtService {
  return {
    sign: jest.fn(() => 'jwt'),
  } as unknown as JwtService;
}
