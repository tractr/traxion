import {
  IsString,
  IsUUID,
} from 'class-validator';

export class UserUpsertParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
