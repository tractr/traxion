import { JwtService } from '@nestjs/jwt';

export function mockJwtServiceFactory(): JwtService {
  return ({
    signAsync: jest.fn(() => 'jwt'),
  } as unknown) as JwtService;
}
