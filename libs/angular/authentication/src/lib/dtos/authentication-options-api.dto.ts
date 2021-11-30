import { IsString } from 'class-validator';

export class AuthenticationOptionsApi {
  @IsString()
  url!: string;
}
