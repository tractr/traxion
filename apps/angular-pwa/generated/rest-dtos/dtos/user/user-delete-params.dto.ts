import {
  IsString,
  IsUUID,
} from 'class-validator';

export class UserDeleteParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
