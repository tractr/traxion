import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

@InputType()
export class UserCreateDto implements Prisma.UserCreateInput {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsBoolean()
  banned: boolean;
}
