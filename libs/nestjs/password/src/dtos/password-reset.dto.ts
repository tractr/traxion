import { IsString } from 'class-validator';

export class PasswordResetDto {
  @IsString()
  id!: string;

  @IsString()
  code!: string;

  @IsString()
  password!: string;
}
