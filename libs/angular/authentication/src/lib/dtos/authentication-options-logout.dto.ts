import { IsString } from 'class-validator';

export class AuthenticationOptionsLogout {
  @IsString()
  url = 'logout';

  @IsString({ each: true })
  redirect: string[] = ['/'];
}
