import { Injectable, Logger as NestLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends NestLogger {}
