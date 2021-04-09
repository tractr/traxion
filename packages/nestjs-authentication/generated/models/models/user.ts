/* eslint-disable import/no-cycle */
import {  
  IsBoolean, 
  IsEmail, 
  IsNumber,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  Matches, 
} from 'class-validator';

 

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

}
