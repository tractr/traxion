import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

@InputType()
export class UserCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsBoolean()
  banned: boolean;
}
