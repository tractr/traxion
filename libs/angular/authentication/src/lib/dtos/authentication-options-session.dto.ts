import { IsString } from 'class-validator';

export class AuthenticationOptionsSession {
  @IsString()
  url = 'me';
}
