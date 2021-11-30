import { IsString } from 'class-validator';

export class AuthenticationOptionsLogin {
  @IsString()
  url = 'login';

  @IsString()
  routing = 'login';

  @IsString({ each: true })
  redirect: string[] = ['/'];
}
