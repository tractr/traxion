import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserCountQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail({})
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  banned?: boolean;
}
