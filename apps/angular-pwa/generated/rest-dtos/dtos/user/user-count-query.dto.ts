
import {
  IsBoolean, 
  IsEmail, 
  IsIn,
  IsDate,

  IsOptional,
  IsString,
} from 'class-validator';

import {
  UserGender,
} from '@generated/models';

export class UserCountQueryDto {
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

  @IsDate({}, )
  @IsOptional()
  lastConnectedAt?: Date;

  @IsString() 
  @IsIn([Object.values(UserGender)], ) 
  @IsOptional()
  gender?: UserGender;

}
