import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { UserService } from '../../generated/user';
import { JwtTokenPayload } from '../dtos';
import { StrategyOptionsService } from '../services';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    protected readonly strategyOptionsService: StrategyOptionsService;
    constructor(userService: UserService, strategyOptionsService: StrategyOptionsService);
    validate(payload: JwtTokenPayload): Promise<User>;
}
export {};
