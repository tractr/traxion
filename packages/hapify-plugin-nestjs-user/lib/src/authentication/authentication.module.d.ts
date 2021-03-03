import { DynamicModule } from '@nestjs/common';
import { AsyncOptions, ModuleOverrideMetadata } from '@tractr/hapify-plugin-nestjs-core';
import { AuthenticationOptions } from './interfaces';
declare const AuthenticationModule_base: {
    new (): {};
    moduleOptionsProvide: string;
    register(options: AuthenticationOptions): DynamicModule;
    registerAsync(options: AsyncOptions<AuthenticationOptions, import("@tractr/hapify-plugin-nestjs-core").OptionsFactory<AuthenticationOptions>>): DynamicModule;
    createAsyncProviders(options: AsyncOptions<AuthenticationOptions, import("@tractr/hapify-plugin-nestjs-core").OptionsFactory<AuthenticationOptions>>): import("@nestjs/common").Provider<any>[];
    createAsyncOptionsProvider(options: AsyncOptions<AuthenticationOptions, import("@tractr/hapify-plugin-nestjs-core").OptionsFactory<AuthenticationOptions>>): import("@nestjs/common").Provider<any>;
};
export declare class AuthenticationModule extends AuthenticationModule_base {
    static moduleOptionsProvide: string;
    static register(options?: AuthenticationOptions, overrides?: ModuleOverrideMetadata): DynamicModule;
    static registerAsync(options?: AsyncOptions<AuthenticationOptions>, overrides?: ModuleOverrideMetadata): DynamicModule;
    private static createAuthenticationModuleFromOptions;
}
export {};
