import { IsString } from 'class-validator';

export class PasswordResetRequestedDto {
  @IsString()
  id!: number | string;
}
