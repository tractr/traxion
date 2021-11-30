import { IsString } from 'class-validator';

export class AuthenticationOptionsRouting {
  @IsString({ each: true })
  prefix: string[] = ['/'];
}
