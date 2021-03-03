export interface JwtTokenPayload {
    iss?: string;
    sub: string;
    aud?: string[];
    iat?: number;
    exp?: number;
    azp?: string;
    scope?: string;
}
