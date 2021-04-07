/* eslint-disable import/no-cycle */
import {  
  IsBoolean, 
  IsEmail, 
  IsIn,
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  Matches, 
} from 'class-validator';

import { Answer } from './answer';

import {
  UserGender
} from '../enums';

export class User {
  @IsString() 
  @IsUUID("all", ) 
  id!: string;

  @IsString() 
  name!: string;

  @IsString() 
  @IsEmail({}, ) 
  email!: string;

  @IsString() 
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, ) 
  password!: string;

  @IsString() 
  role!: string;

  @IsBoolean() 
  banned!: boolean;

  @IsNumber({}, )
  @IsDate({}, )
  @IsOptional()
  lastConnectedAt?: Date;

  @IsString() 
  @IsIn(Object.values(UserGender),) 
  gender!: UserGender;

  @ValidateNested({ each: true}) 
  answerAsUser?: Answer[];

}
