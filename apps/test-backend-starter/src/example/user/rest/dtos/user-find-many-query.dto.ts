import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UserFindManyQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsBoolean()
  banned?: boolean;
}
