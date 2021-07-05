import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export function fromHttpOnlySignedAndSecureCookies(
  cookieName: string,
): JwtFromRequestFunction {
  return (req: Request) => {
    if (req && req.signedCookies && req.signedCookies[cookieName]) {
      return req.signedCookies[cookieName];
    }

    return null;
  };
}
