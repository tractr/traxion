import { IsBoolean, IsString, IsEmail, Matches } from 'class-validator';

export class UserCreateBodyDto {
  @IsString()
  name!: string;

  @IsString()
  @IsEmail({})
  email!: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
  password!: string;

  @IsString()
  role!: string;

  @IsBoolean()
  banned!: boolean;
}
