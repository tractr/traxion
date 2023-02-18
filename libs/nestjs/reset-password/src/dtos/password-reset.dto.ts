import { IsString } from 'class-validator';

export class PasswordResetDto {
  @IsString()
  id!: string | number;

  @IsString()
  code!: string;

  @IsString()
  password!: string;
}
