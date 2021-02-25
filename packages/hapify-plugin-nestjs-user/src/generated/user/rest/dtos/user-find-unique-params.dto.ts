import {
  IsString,
  IsUUID,
} from 'class-validator';

export class UserFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
