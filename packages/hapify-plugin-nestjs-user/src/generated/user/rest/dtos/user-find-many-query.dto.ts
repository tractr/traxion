import { Prisma, User } from '@prisma/client';
import {
  IsOptional,
  IsString,
  IsIn,
  IsNumber,
  IsInt,
  Min,
  IsBoolean,
  IsEmail,
} from 'class-validator';

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

  @IsNumber()
  @IsInt()
  @Min(1)
  take!: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  skip!: number;
}
