import { IsString } from 'class-validator';

export class PasswordResetRequestedDto {
  @IsString()
  login!: string;
}
