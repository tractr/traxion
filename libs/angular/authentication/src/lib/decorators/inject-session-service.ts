import { Inject } from '@nestjs/common';
import { SESSION_SERVICE } from '../authentication.config';

export const InjectSessionService = () => Inject(SESSION_SERVICE);
