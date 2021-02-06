import { IsString } from 'class-validator';

export class UserUpdateParamsDto {
  @IsString()
  id!: string;
}
