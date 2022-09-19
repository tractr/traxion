import { IsString } from 'class-validator';

export class PasswordUpdateDto {
  @IsString()
  newPassword!: string;

  @IsString()
  oldPassword!: string;
}
