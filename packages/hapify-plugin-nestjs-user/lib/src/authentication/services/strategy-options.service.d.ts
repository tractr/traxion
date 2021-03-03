import { StrategyOptions } from 'passport-jwt';
import { IStrategyOptionsWithRequest } from 'passport-local';
import { AuthenticationOptions } from '../interfaces';
export declare class StrategyOptionsService {
    private readonly authenticationOptions;
    constructor(authenticationOptions: AuthenticationOptions);
    createLocalStrategyOptions(): IStrategyOptionsWithRequest;
    createJwtStrategyOptions(): StrategyOptions;
}
