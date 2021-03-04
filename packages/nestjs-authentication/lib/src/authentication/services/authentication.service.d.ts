import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '../../generated/user';
import { AccessTokenDto } from '../dtos';
import { AuthenticationOptions } from '../interfaces';
export declare class AuthenticationService {
    private readonly authenticationOptions;
    private readonly userService;
    private readonly jwtService;
    constructor(authenticationOptions: AuthenticationOptions, userService: UserService, jwtService: JwtService);
    validateUser(login: string, password: string): Promise<User | null>;
    authenticateLoginCredentials(login: string, password: string): Promise<User | null>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    createUserJWT(user: User): Promise<string>;
    login(user: User): Promise<AccessTokenDto>;
}
