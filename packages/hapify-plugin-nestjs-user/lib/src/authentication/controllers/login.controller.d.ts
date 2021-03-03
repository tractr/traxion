import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { AccessTokenDto } from '../dtos';
import { AuthenticationOptions } from '../interfaces';
import { AuthenticationService } from '../services';
export declare class LoginController {
    private readonly authenticationOptions;
    private readonly authenticationService;
    constructor(authenticationOptions: AuthenticationOptions, authenticationService: AuthenticationService);
    login(req: Request, res: Response): Promise<AccessTokenDto>;
    getProfile(user: User): User;
}
