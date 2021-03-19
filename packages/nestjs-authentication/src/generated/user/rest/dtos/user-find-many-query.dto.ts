import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { Prisma, User } from '@prisma/client';

export class UserFindManyQueryDto {
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

  @IsOptional()
  @IsString()
  @IsIn(['name', 'email'])
  sort: keyof User = 'id';

  @IsOptional()
  @IsIn(Object.values(Prisma.SortOrder))
  order: Prisma.SortOrder = 'asc';

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  take = 100;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  skip = 0;
}
