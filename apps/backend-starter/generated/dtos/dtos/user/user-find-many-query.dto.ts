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

import {
  UserGender,
  UserInclude,
  SortOrder,
  User,
} from '@generated/models';

export class UserFindManyQueryDto {
  @IsString() 
  @IsOptional()
  id?: string;

  @IsString() 
  @IsOptional()
  name?: string;

  @IsString() 
  @IsEmail({}, ) 
  @IsOptional()
  email?: string;

  @IsString() 
  @IsOptional()
  role?: string;

  @IsBoolean() 
  @IsOptional()
  banned?: boolean;

  @IsString() 
  @IsIn(Object.values(UserGender), ) 
  @IsOptional()
  gender?: UserGender;

  @IsString({ each: true })
  @IsIn(Object.values(UserInclude), { each: true })
  @IsOptional()
  populate?: UserInclude[];

  @IsOptional()
  @IsString()
  @IsIn([
    'id',
    'name',
    'email',
    'gender',
  ]) 
  sort: keyof User = 'id';

  @IsOptional()
  @IsIn(Object.values(SortOrder)) 
  order: SortOrder = 'asc';

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
