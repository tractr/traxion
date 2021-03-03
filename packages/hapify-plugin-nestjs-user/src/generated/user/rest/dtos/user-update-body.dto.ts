
import {  
  IsBoolean, 
  IsString,
  IsEmail, 
  Matches, 
  IsOptional,
} from 'class-validator';

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

}
