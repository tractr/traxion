import { IsString } from 'class-validator';

export class PasswordResetRequestedDto {
  @IsString()
  email!: string;
}
