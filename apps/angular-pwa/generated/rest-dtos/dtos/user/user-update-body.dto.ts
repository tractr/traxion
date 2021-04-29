
import {  
  IsBoolean, 
  IsEmail, 
  IsIn,
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  Matches, 
} from 'class-validator';

import {
  UserGender,
} from '@generated/models';

export class UserUpdateBodyDto {
  @IsString() 
  @IsOptional()
  name?: string;

  @IsString() 
  @IsEmail({}, ) 
  @IsOptional()
  email?: string;

  @IsString() 
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, ) 
  @IsOptional()
  password?: string;

  @IsString() 
  @IsOptional()
  role?: string;

  @IsBoolean() 
  @IsOptional()
  banned?: boolean;

  @IsNumber({}, )
  @IsDate({}, )
  @IsOptional()
  lastConnectedAt?: Date;

  @IsString() 
  @IsIn(Object.values(UserGender),) 
  @IsOptional()
  gender?: UserGender;

}
