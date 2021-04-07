import {
  IsString,
  IsUUID,
} from 'class-validator';

export class TagFindUniqueParamsDto {
  @IsString()
  @IsUUID()
  id!: string;
}
