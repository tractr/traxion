import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthenticationService, StrategyOptionsService } from '../services';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authenticationService;
    protected readonly strategyOptionsService: StrategyOptionsService;
    constructor(authenticationService: AuthenticationService, strategyOptionsService: StrategyOptionsService);
    validate(login: string, password: string): Promise<User>;
}
export {};
