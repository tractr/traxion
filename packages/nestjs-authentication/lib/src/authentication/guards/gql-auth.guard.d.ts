import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
export declare class GqlAuthGuard extends JwtAuthGuard {
    getRequest(context: ExecutionContext): unknown;
}
