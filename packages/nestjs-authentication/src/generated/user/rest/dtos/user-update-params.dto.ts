import { IsString, IsUUID } from 'class-validator';

export class UserUpdateParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
