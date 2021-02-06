import { IsString } from 'class-validator';

export class UserDeleteParamsDto {
  @IsString()
  id!: string;
}
