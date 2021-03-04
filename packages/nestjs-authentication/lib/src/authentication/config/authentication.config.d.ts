import { OptionsFactory } from '@tractr/nestjs-core';
import { AuthenticationOptions } from '../interfaces';
export declare const AUTHENTICATION_COOKIE_NAME = "authCookie";
export declare const AUTHENTICATION_QUERY_PARAM_NAME = "authToken";
export declare const AUTHENTICATION_OPTIONS: AuthenticationOptions;
export declare class AuthenticationModuleOptionsFactory implements OptionsFactory<AuthenticationOptions> {
    createOptions(): Promise<AuthenticationOptions> | AuthenticationOptions;
}
