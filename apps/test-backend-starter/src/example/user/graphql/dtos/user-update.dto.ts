import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  banned?: boolean;
}
